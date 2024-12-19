import { createSharedComposable, watchOnce } from '@vueuse/core'
import type { Channel } from 'phoenix'
import { ref, watch } from 'vue'
import { Socket } from 'phoenix'
import { useApiKeyStore } from '@/stores/apiKey'
import { API_BASE_URL } from '@v7-product-interview-task/api'


const getEndpoint = () => {
  const { hostname, protocol, port } = new URL(API_BASE_URL.replace('/api', ''))
  const wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:'
  const wsPort = getPort(port, protocol)
  return `${wsProtocol}//${hostname}:${wsPort}/socket`
}

const getPort = (port: string, protocol: string) => {
  if (port === '') {
    return protocol === 'https:' ? '443' : '80'
  }

  return port
}

export const createSocket = (token: string): Socket =>
  new Socket(getEndpoint(), { params: { token }, heartbeatIntervalMs: 15000 })

const wait = (attempts: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, [1000, 5000, 10000][attempts - 1] ?? 60000)
  })

export const useWebSocket = createSharedComposable(() => {
  const socket = ref<null | ReturnType<typeof createSocket>>(null)
  const connectionTries = ref(0)

  const tokenStore = useApiKeyStore()
  const socketState = ref('closed')

  const updateSocketState = () => {
    socketState.value = socket.value?.connectionState() || 'closed'

    // when the socket comes back online, reset the counter
    if (socketState.value === 'open' && connectionTries.value > 0) {
      connectionTries.value = 0
    }
  }

  /**
   * Connect to the backend websocket endpoint
   *
   * Should be called once per full page load, usually in the main application component.
   *
   * If the conditions of the connection change (such as the user logging in or out),
   * the socket should be disconnected and reconnected.
   */
  const connect = async () => {
    if (socket.value) {
      return
    }

    const token = tokenStore.token
    socket.value = createSocket(token)
    socket.value?.onOpen(updateSocketState)
    socket.value?.onClose(updateSocketState)
    socket.value?.onError(async () => {
      await new Promise<void>((resolve) => socket.value?.disconnect(resolve))
      updateSocketState()
      socket.value = null

      connectionTries.value++
      if (connectionTries.value > 5) {
        return Promise.reject('Failed to reconnect to the server. Please try again later.')
      }

      await wait(connectionTries.value)
      // recursively try to reconnect
      connect()
    })
    socket.value?.connect()
  }

  /**
   * Creates a promise resolving channel using the app's websocket connection.
   * Will wait for the connection to be instantiated before resolving.
   *
   * Because it's only possible to call join on a phoenix channel once, there
   * cannot be a recycled pool of channels. Instead, the channel is created on
   * every call.
   *
   * It may potentially still be possible to hold a pool of current channels,
   * in order to reuse subscriptions to topics, but that's probably an
   * overoptimisation at this point.
   */
  const getChannel = (topic: string) =>
    new Promise<Channel>((resolve) => {
      if (socket.value) {
        resolve(socket.value.channel(topic))
      }

      watchOnce(socket, (socket) => {
        if (socket) {
          resolve(socket.channel(topic))
        }
      })
    })

  watch(() => tokenStore.isValid, async (isValid) => {
    if (isValid) {
      await connect()
    }
  }, {
    immediate: true,
  })

  return {
    connect,
    socketState,
    getChannel,
  }
})


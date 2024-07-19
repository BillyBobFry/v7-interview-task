import type { Channel, ChannelState } from 'phoenix'
import { ref, shallowRef, watch, type Ref } from 'vue'
import { useWebSocket } from './useWebSocket'

/**
 * Abstraction for subscribing to a websocket channel topic.
 *
 * As the topic changes, the channel will leave and rejoin.
 *
 * Exposes a shallow ref to the channel as well as a ref to the channel state,
 *
 * `channel.value.on` can be called to subscribe to messages on the channel.
 *
 * Channels are maintined in the shared `useWebSocket` composable, so the same
 * instance of a channel for any given topic should be returned. This has not
 * been tested, though, so use carefuly.
 */
export const useWebSocketChannel = (topic: Ref<string | null>) => {
  const channelState = ref<ChannelState>('closed')
  const ws = useWebSocket()

  const channel = shallowRef<Channel>()

  const leave = async (channel: Channel) =>
    new Promise((resolve) => {
      const push = channel.leave()
      push.receive('ok', () => {
        channelState.value = channel.state || 'closed'
        resolve(undefined)
      })
      push.receive('error', () => {
        channelState.value = channel.state || 'closed'
        resolve(undefined)
      })
      push.receive('timeout', () => {
        channelState.value = channel.state || 'closed'
        resolve(undefined)
      })
    })

  const join = async (channel: Channel) =>
    new Promise((resolve) => {
      const push = channel.join()
      push.receive('ok', () => {
        channelState.value = channel.state || 'closed'
        resolve(undefined)
      })
      push.receive('error', () => {
        channelState.value = channel.state || 'closed'
        resolve(undefined)
      })
      push.receive('timeout', () => {
        channelState.value = channel.state || 'closed'
        resolve(undefined)
      })
    })

  watch(
    topic,
    async (newTopic, oldTopic) => {
      if (oldTopic === newTopic) {
        return
      }

      if (oldTopic && channel.value) {
        await leave(channel.value)
      }

      if (!newTopic) {
        return
      }

      const newChannel = await ws.getChannel(newTopic)
      channel.value = newChannel
      if (!newChannel) {
        return
      }

      await join(newChannel)
    },
    { immediate: true },
  )

  const leaveChannel = async () => channel.value && (await leave(channel.value))

  return {
    channel,
    channelState,
    leaveChannel,
  }
}

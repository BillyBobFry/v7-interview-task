import type { components } from './api'
import { API_BASE_URL } from './constants'
import type { Entity } from './types'


export const getEntities = async (
  {authToken, projectId, workspaceId}: {workspaceId: string,
  projectId: string,
  authToken: string}
) => {
  const res = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/projects/${projectId}/entities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${authToken}`
    }
  })

  const entityResponse = await res.json()
  return entityResponse.data as Entity[]
}
  

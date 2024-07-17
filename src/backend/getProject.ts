import { API_BASE_URL } from './constants'
import type { Project } from './types'


export const getProject = async (
  {authToken, projectId, workspaceId}: {workspaceId: string,
  projectId: string,
  authToken: string}
) => {
  const res = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/projects/${projectId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${authToken}`
    }
  })

  const projectResponse = await res.json()
  return projectResponse as Project
}
  

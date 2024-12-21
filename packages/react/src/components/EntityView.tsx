import { useProjectContext } from '@/contexts/ProjectContext'
import {useNavigate, useParams} from 'react-router'

export const EntityView = () => {
  const navigate = useNavigate()
  const {projectId, workspaceId} = useProjectContext()
  const {entityId} = useParams() as {entityId: string}

  return <>
  	<a href="#" onClick={() => navigate(-1)}>Back</a>
  <ul>
    <li>Entity ID: { entityId }</li>
    <li>Workspace ID: { workspaceId }</li>
    <li>Project ID: { projectId }</li>
  </ul>
  </>
}
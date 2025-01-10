import { useProjectContext } from "@/contexts/Project/useProjectContext";
import { Link, useParams } from "react-router";

export const EntityView = () => {
  const { projectId, workspaceId } = useProjectContext();
  const { entityId } = useParams() as { entityId: string };

  return (
    <>
      <Link to={`/${workspaceId}/projects/${projectId}`}>Back</Link>
      <ul>
        <li>Entity ID: {entityId}</li>
        <li>Workspace ID: {workspaceId}</li>
        <li>Project ID: {projectId}</li>
      </ul>
    </>
  );
};

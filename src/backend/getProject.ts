import { API_BASE_URL } from "./constants";
import type { Project } from "./types";

export const getProject = async ({
  apiKey,
  projectId,
  workspaceId,
}: {
  workspaceId: string;
  projectId: string;
  apiKey: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/workspaces/${workspaceId}/projects/${projectId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }

  const projectResponse = await res.json();
  return projectResponse as Project;
};

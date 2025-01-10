import { API_BASE_URL } from "./constants";
import type { Entity } from "./types";

export const getEntities = async ({
  apiKey,
  projectId,
  workspaceId,
}: {
  workspaceId: string;
  projectId: string;
  apiKey: string;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/workspaces/${workspaceId}/projects/${projectId}/entities`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch entities");
  }

  const entityResponse = await res.json();
  return entityResponse.data as Entity[];
};

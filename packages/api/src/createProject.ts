import { API_BASE_URL } from "./constants";
import type { Project } from "./types";

export const createProject = async ({
    apiKey,
    workspaceId,
    name
}: {
    workspaceId: string;
    apiKey: string;
    name: string;
}) => {
    const res = await fetch(
        `${API_BASE_URL}/workspaces/${workspaceId}/projects`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey,
            },
            body: JSON.stringify({
                name,
            }),
        },
    );

    console.log(res);

    if (!res.ok) {
        throw new Error("Failed to create project");
    }

    const projectResponse = await res.json();
    return projectResponse as Project;
};

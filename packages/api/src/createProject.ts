import { API_BASE_URL } from "./constants";
import type { Project } from "./types";

// NOTE: These are just sample requests. We would ideally be importing types from the API and making better use of them.

export const createProject = async ({
    apiKey,
    workspaceId,
    name
}: {
    workspaceId: string;
    apiKey: string;
    name: string;
}) => {
    // TODO: We should ideally have an abstraction for creating these requests.

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

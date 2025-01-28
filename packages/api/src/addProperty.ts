import { API_BASE_URL } from "./constants";
import type { operations } from "./api";

type AddPropertyRequest = operations["project-add-property"]["requestBody"]["content"]["application/json"];
type AddPropertyResponse = operations["project-add-property"]["responses"][200]["content"]["application/json"];

export const addProperty = async ({
    apiKey,
    workspaceId,
    projectId,
    ...requestBody
}: {
    apiKey: string;
    workspaceId: string;
    projectId: string;
} & AddPropertyRequest): Promise<AddPropertyResponse> => {
    const res = await fetch(
        `${API_BASE_URL}/workspaces/${workspaceId}/projects/${projectId}/properties`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey,
            },
            body: JSON.stringify(requestBody),
        },
    );

    if (!res.ok) {
        // TODO: Add better error handling, at least for the ones we already have definitions for.
        throw new Error("Failed to create project");
    }

    return res.json();
};

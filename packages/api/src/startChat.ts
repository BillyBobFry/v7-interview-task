import { API_BASE_URL } from "./constants";

export const startChat = async ({
    apiKey,
    workspaceId,
}: {
    workspaceId: string;
    apiKey: string;
}) => {
    const res = await fetch(
        `${API_BASE_URL}/workspaces/${workspaceId}/ask_go`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey,
            },
            body: JSON.stringify({
                workspaceId,
            }),
        },
    );

    if (!res.ok) {
        throw new Error("Failed to create chat");
    }

    return await res.json();
}; 
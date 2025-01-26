import { API_BASE_URL } from "./constants";

export const startChat = async ({
    apiKey,
    workspaceId,
}: {
    workspaceId: string;
    apiKey: string;
}) => {
    const res = await fetch(
        `${API_BASE_URL}/workspaces/${workspaceId}/spaces`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey,
            },
            body: JSON.stringify({
                name: `New Chat ${Date.now()}`,
                type: 'chat'
            }),
        },
    );

    if (!res.ok) {
        throw new Error("Failed to create chat");
    }

    return await res.json();
}; 
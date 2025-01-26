import { ProjectContextType, useProjectContext } from "@/contexts/Project/useProjectContext";
import { createProject, startChat } from "@v7-product-interview-task/api";

const apiKey = import.meta.env.VITE_API_KEY;
if (!apiKey) {
    throw new Error('VITE_API_KEY env variable is not set');
}

const navigate = (relativePath: string) => {
    window.location.pathname = relativePath;
}

export type Suggestion = {
    label: string;
    command: CommandType;
    description?: string;
    shouldShow: (projectContext: ProjectContextType) => boolean;
    onSubmit: (projectContext: ProjectContextType) => void;
}

export enum CommandType {
    CREATE_PROJECT = 'create-new-project',
    START_CHAT = 'start-chat',
    NAVIGATE_ROW = 'navigate-to-row',
    EXPORT_PROJECT = 'export-project',
    ADD_PROPERTY = 'add-new-property'
}

export const defaultSuggestions: Suggestion[] = [
    {
        label: 'Create New Project',
        description: 'Create a new project in the current workspace',
        command: CommandType.CREATE_PROJECT,
        shouldShow: (projectContext: ProjectContextType) => {
            return !!projectContext.workspaceId;
        },
        onSubmit: async (projectContext: ProjectContextType) => {
            if (!projectContext.workspaceId) {
                throw new Error('workspaceId is required');
            }
            const project = await createProject({
                workspaceId: projectContext.workspaceId,
                apiKey,
                name: `New Project ${Date.now()}`
            });
            console.log(project);
            navigate(`${projectContext.workspaceId}/projects/${project.id}`);
        }
    },
    {
        label: 'Start Chat',
        description: 'Start a chat with the current project',
        command: CommandType.START_CHAT,
        shouldShow: (projectContext: ProjectContextType) => {
            return !!projectContext.workspaceId;
        },
        onSubmit: async (projectContext: ProjectContextType) => {
            if (!projectContext.workspaceId) {
                throw new Error('workspaceId is required');
            }
            const chat = await startChat({
                workspaceId: projectContext.workspaceId,
                apiKey,
            });
            console.log(chat);
            navigate(`${projectContext.workspaceId}/chats/${chat.id}`);
        }
    },
    {
        label: 'Navigate to Row',
        description: 'Navigate to a row in the current project',
        command: CommandType.NAVIGATE_ROW,
        shouldShow: (projectContext: ProjectContextType) => {
            return !!projectContext.workspaceId && !!projectContext.projectId;
        },
        onSubmit: async (projectContext: ProjectContextType) => {
            console.log('navigating to row');
            console.log(projectContext);
        }
    },
    {
        label: 'Export Project',
        description: 'Export the current project',
        command: CommandType.EXPORT_PROJECT,
        shouldShow: (projectContext: ProjectContextType) => {
            return !!projectContext.workspaceId && !!projectContext.projectId;
        },
        onSubmit: async (projectContext: ProjectContextType) => {
            console.log('exporting project');
            console.log(projectContext);
        }
    },
    {
        label: 'Add New Property',
        description: 'Add a new property to the current project',
        command: CommandType.ADD_PROPERTY,
        shouldShow: (projectContext: ProjectContextType) => {
            return !!projectContext.workspaceId && !!projectContext.projectId;
        },
        onSubmit: async (projectContext: ProjectContextType) => {
            console.log('adding new property');
            console.log(projectContext);
        }
    },
];  
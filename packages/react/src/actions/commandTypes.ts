import { ProjectContextType, useProjectContext } from "@/contexts/Project/useProjectContext";
import { createProject, startChat } from "@v7-product-interview-task/api";
import { addProperty } from "@v7-product-interview-task/api/src/addProperty";
import { exportProject } from "@v7-product-interview-task/api/src/exportProject";

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

/**
 * Note: I've added direct API calls here, but seems like the real app calls ask_go for most. I coudln't manage to access ask go in the main app so couldn't test how the real workflow would be.
 *
 */

const getRequiredData = async (projectContext: ProjectContextType, commandType: CommandType): Promise<Record<string, any>> => {
/**
 * Based on my assumptions, we actually call ask_go here, ask it to collect a certain set of data and then make the API call. That's probably a simpler UX and easier to build from a dev POV, else we'll have to build a form builder or ask for different values within the command center input which can be hard to scale. 
 * 
 */

    if (!projectContext.workspaceId || !projectContext.projectId || !projectContext.project) {
        throw new Error('workspaceId, projectId and project are required');
    }

    const requiredData: Record<string, any> = {};


    if (commandType === CommandType.ADD_PROPERTY) {
        requiredData.type = 'text';
        requiredData.tool = 'manual';
        requiredData.name = 'New Property';
        requiredData.description = 'New Property';
    }

    requiredData.workspaceId = projectContext.workspaceId;
    requiredData.projectId = projectContext.projectId;
    requiredData.project = projectContext.project;

    return requiredData;
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
            // THis seems like more of frontend state management problem, than an API request. 
            /**
             * The project would have a list of entities, and we can simply instruct the frontend to scroll to the entity with the id that the user provided.   
             */
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
            if (!projectContext.workspaceId || !projectContext.projectId || !projectContext.project) {
                throw new Error('workspaceId, projectId and project are required');
            }
            const project = await exportProject({
                workspaceId: projectContext.workspaceId,
                apiKey,
                projectId: projectContext.projectId,
                name: projectContext.project.name ?? `Export ${Date.now()}`
            });
            console.log(project);
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

            if (!projectContext.workspaceId || !projectContext.projectId || !projectContext.project) {
                throw new Error('workspaceId, projectId and project are required');
            }
            const requiredData = await getRequiredData(projectContext, CommandType.ADD_PROPERTY);
            const property = await addProperty({
                workspaceId: projectContext.workspaceId,
                apiKey,
                projectId: projectContext.projectId,
                type: requiredData.type!,
                tool: requiredData.tool!,
                name: requiredData.name!,
                description: requiredData.description!,
            });
            console.log(property);
        }
    },
];  
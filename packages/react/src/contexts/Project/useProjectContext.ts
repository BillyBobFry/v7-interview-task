import { Entity, Project } from "@v7-product-interview-task/api";
import { createContext, useContext } from "react";

export type ProjectContextType = {
  project: Project | null;
  entities: Entity[];
  workspaceId: string;
  projectId: string;
};

export const ProjectContext = createContext<ProjectContextType | null>(null);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

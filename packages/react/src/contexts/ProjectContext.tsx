import React, { createContext, useContext, useState, useEffect } from 'react';
import { Entity, getEntities, getProject, Project } from '@v7-product-interview-task/api';
import { useParams } from 'react-router';

type ProjectContextType = {
  project: Project | null;
  entities: Entity[];
  workspaceId: string;
  projectId: string;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [entities, setEntities] = useState<Entity[]>([]);

  const {workspaceId, projectId} = useParams() as { workspaceId: string; projectId: string };
  
  useEffect(() => {
    const load = async () => {
      const apiKey = import.meta.env.VITE_API_KEY
      if (!apiKey) {
        throw new Error('VITE_API_KEY env variable is not set');
      }
  
      try {
        const [projectData, entityData] = await Promise.all([
          getProject({
            apiKey,
            projectId,
            workspaceId,
          }),
          getEntities({
            apiKey,
            projectId,
            workspaceId,
          }),
        ]);
  
        setProject(projectData);
        setEntities(entityData);
      } catch {
        setEntities([]);
        setProject(null);
      }
    };
    load();
  }, [projectId, workspaceId]);

  const value = {
    project,
    entities,
    workspaceId,
    projectId,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

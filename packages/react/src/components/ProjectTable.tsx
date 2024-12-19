import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {ProjectTableCell} from './ProjectTableCell';
import {ProjectTableHeaderCell} from './ProjectTableHeaderCell';
import {AuthHandler} from './AuthHandler';
import { Entity, getEntities, getProject, Project } from '@v7-product-interview-task/api';

// Custom hook to replace Vue's store functionality
const useStore = () => {
  const [apiKey, setApiKey] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [project, setProject] = useState<Project | null>(null);

  return {
    apiKey: {
      token: apiKey,
      setToken: setApiKey,
      isValid,
      setIsValid
    },
    entities: {
      list: entities,
      setEntities
    },
    project: {
      data: project,
      setProject
    }
  };
};

// Custom hook to handle project channel (you'll need to implement the actual WebSocket logic)
const useProjectChannel = (projectId: string) => {
  useEffect(() => {
    // Implement WebSocket connection logic here
    return () => {
      // Cleanup WebSocket connection
    };
  }, [projectId]);
};

export const ProjectTable = () => {
  const {workspaceId, projectId} = useParams() as { workspaceId: string; projectId: string };
   const store = useStore();
  
  useProjectChannel(projectId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await getProject({
          apiKey: import.meta.env.VITE_API_KEY,
          projectId,
          workspaceId
        });

        const entitiesData = await getEntities({
          apiKey: import.meta.env.VITE_API_KEY,
          projectId,
          workspaceId
        });

        store.project.setProject(projectData);
        store.entities.setEntities(entitiesData);
        store.apiKey.setIsValid(true);
      } catch {
        store.apiKey.setIsValid(false);
        store.entities.setEntities([]);
        store.project.setProject(null);
      }
    };

      fetchData();
  }, [store.apiKey.token, projectId, workspaceId]);

  return (
    <div className="flex flex-col gap-4 h-full p-2">
      <AuthHandler />

      {store.project.data && (
        <table 
          className="min-w-full border-collapse"
          role="grid"
          style={{ 
            gridTemplateColumns: `repeat(${store.project.data.properties.length}, 1fr)` 
          }}
        >
          <thead>
            <tr>
              <th />
              {store.project.data.properties.map((property, index) => (
                <ProjectTableHeaderCell
                  key={property.id}
                  property={property}
                  columnIndex={index}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {store.entities.list.map((entity, entityIndex) => (
              <tr key={entity.id}>
                <td tabIndex={0}>
                  <Link
                    to={`/workspace/${workspaceId}/project/${projectId}/entity/${entity.id}`}
                  >
                    {entityIndex + 1}
                  </Link>
                </td>
                {store.project.data?.properties.map((property, propertyIndex) => (
                  <ProjectTableCell
                    key={property.id}
                    field={entity.fields[property.slug]}
                    entityIndex={entityIndex}
                    propertyIndex={propertyIndex}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style jsx>{`
        td, th {
          text-align: left;
          border: 1px solid grey;
        }

        td {
          position: relative;
          vertical-align: top;
          padding: 0.5rem;
        }

        td:focus, th:focus {
          outline: 2px solid deepskyblue;
        }
      `}</style>
    </div>
  );
};

export default ProjectTable;
import { Link, useParams } from 'react-router-dom';
import {ProjectTableCell} from './ProjectTableCell';
import {ProjectTableHeaderCell} from './ProjectTableHeaderCell';
import { useProjectContext } from '@/contexts/ProjectContext';
import styles from '@v7-product-interview-task/styles/ProjectTable.module.css'


export const ProjectTable = () => {
  const {workspaceId, projectId} = useParams() as { workspaceId: string; projectId: string };
  const {entities, project} = useProjectContext()

  return (
    <div className={styles.container}>
      {project && (
        <table 
          className={styles.grid}
          role="grid"
          style={{ 
            gridTemplateColumns: `repeat(${project.properties.length}, 1fr)` 
          }}
        >
          <thead>
            <tr>
              <th />
              {project.properties.map((property, index) => (
                <ProjectTableHeaderCell
                  key={property.id}
                  property={property}
                  columnIndex={index}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {entities.map((entity, entityIndex) => (
              <tr key={entity.id}>
                <td tabIndex={0}>
                  <Link
                    to={`/${workspaceId}/projects/${projectId}/entities/${entity.id}`}
                  >
                    {entityIndex + 1}
                  </Link>
                </td>
                {project?.properties.map((property, propertyIndex) => (
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
    </div>
  );
};

export default ProjectTable;
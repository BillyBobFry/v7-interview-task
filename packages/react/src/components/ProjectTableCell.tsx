import { Entity } from '@v7-product-interview-task/api';
import React, { useRef } from 'react';
import styles from '@v7-product-interview-task/styles/ProjectTableCell.module.css'

type TableCellProps = {
  propertyIndex: number;
  entityIndex: number;
  field: Entity['fields'][string];
}

export const ProjectTableCell: React.FC<TableCellProps> = ({ propertyIndex, entityIndex, field }) => {
  const cellRef = useRef<HTMLTableCellElement>(null);

  const onClickCell = () => {
    cellRef.current?.focus();
  };

  const text = field?.tool_value.value?.toString() || field?.manual_value.value?.toString();

  return (
    <td
      className={styles.cell}
      ref={cellRef}
      role="gridcell"
      aria-rowindex={entityIndex + 1}
      aria-colindex={propertyIndex + 1}
      tabIndex={0}
      onClick={onClickCell}
    >
      {
        text ? (
          <span>{text}</span>
        ) : (
          <span className={styles.emptyCell}>(empty)</span>
        )
      }
    </td>
  );
};

export default ProjectTableCell;
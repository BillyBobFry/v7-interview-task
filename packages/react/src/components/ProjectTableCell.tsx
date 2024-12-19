import { Entity } from '@v7-product-interview-task/api';
import React, { useRef } from 'react';

interface TableCellProps {
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
      ref={cellRef}
      role="gridcell"
      aria-rowindex={entityIndex + 1}
      aria-colindex={propertyIndex + 1}
      tabIndex={0}
      onClick={onClickCell}
      className="p-2 min-w-[300px] max-w-[500px] overflow-hidden"
    >
      {text ? (
        <span>{text}</span>
      ) : (
        <i className="opacity-75">(empty)</i>
      )}
    </td>
  );
};

export default ProjectTableCell;
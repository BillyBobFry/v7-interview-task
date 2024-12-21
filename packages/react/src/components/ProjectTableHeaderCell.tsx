import { Property } from "@v7-product-interview-task/api";
import "@v7-product-interview-task/styles/ProjectTableHeaderCell.module.css"

export const ProjectTableHeaderCell = ({
  property,
  columnIndex,
}: {
  property: Property;
  columnIndex: number;
}) => {
  return (
    <th
      role="gridcell"
      aria-rowindex={1}
      aria-colindex={columnIndex + 1}
      tabIndex={0}
    >
      {property.name}
      <i>({property.type})</i>
    </th>
  );
};

import { Property } from "@v7-product-interview-task/api";
import styles from "@v7-product-interview-task/styles/ProjectTableHeaderCell.module.css"

export const ProjectTableHeaderCell = ({
  property,
  columnIndex,
}: {
  property: Property;
  columnIndex: number;
}) => {
  return (
    <th
      className={styles['headerCell']}
      role="gridcell"
      aria-rowindex={1}
      aria-colindex={columnIndex + 1}
      tabIndex={0}
    >
      {property.name}
      <span className={styles['propertyType']}>({property.type})</span>
    </th>
  );
};

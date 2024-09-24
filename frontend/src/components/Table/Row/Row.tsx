import React from "react";
import TableRow from "interfaces/TableRow";
import Cell from "../Cell";
import styles from "../Table.module.css";

const Row: React.FC<{ row: TableRow }> = ({ row }) => {
  const getClassName = () => {    
    switch (row.type) {
      case "Header":
        return styles.table__row+' '+styles.table__header;
      case "Section":
        return styles.table__row+' '+styles.table__section;
      case "SummaryRow":
        return styles.table__row+' '+styles.table__summary;      
      default:
        return styles.table__row;
    }
  };

  return (
    <div className={getClassName()}>
      {row.columns.map((col, index) => (
        <Cell key={index} content={col} />
      ))}
    </div>
  );
};

export default Row;

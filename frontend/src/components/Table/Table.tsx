import React, { useState } from "react";
import TableProps from "interfaces/TableProps";
import Row from "./Row";
import styles from "./Table.module.css";
import Pagination from "components/Pagination";

const Table: React.FC<TableProps> = ({ rows, rowsPerPage, isPagination }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handleChangePage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className={styles.table__container}>
      <div className={styles.table}>
        {paginatedRows.map((row, index) => (
          <Row key={index} row={row} />
        ))}
      </div>
      {isPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={handleChangePage}
        ></Pagination>
      )}
    </div>
  );
};

export default Table;

import React, { useEffect, useState } from "react";
import { fetchBalanceSheetData } from 'services/BalanceSheetService';
import BalanceSheetReport from "interfaces/BalanceSheetReport";
import Table from "components/Table";
import TableRow from "interfaces/TableRow";
import Pagination from "components/Pagination";
import styles from "./BalanceSheet.module.css";

interface SheetData {
  Title: String;
  TableData: Array<TableRow>;
}

const BalanceSheet: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const handleChangePage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const [data, setData] = useState<Array<SheetData>>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const reportData: BalanceSheetReport = await fetchBalanceSheetData();              
        const transformedData: SheetData[] = reportData.Reports.map((_report) => {
          const _tableData: TableRow[] = [];
          const _title: string = _report.ReportTitles.join(" ");          
          _report.Rows.forEach((_row) => {
            if (_row.RowType === "Section") {
              _tableData.push({
                type: _row.RowType,
                columns: [_row.Title],
              });
              _row.Rows.forEach((_nestedRow) => {
                _tableData.push({
                  type: _nestedRow.RowType,
                  columns: _nestedRow.Cells.map((_c) => _c.Value),
                });
              });
            } else {
              _tableData.push({
                type: _row.RowType,
                columns: _row.Cells.map((_c) => _c.Value),
              });
            }
          });
          return {
            Title: _title,
            TableData: _tableData,
          };
        });

        setData(transformedData);
        setTotalPages(reportData.Reports.length);
      } catch (err) {
        setError("Error fetching balance sheet data");
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="m-10">Loading...</div>;
  }
  if (error) {
    return (
      <div className="m-10">
        <h2 className="error-text">{error}</h2>
      </div>
    );
  }       
  return (
    <div className={styles.balanceSheet__container}>
      <span>{data?.[currentPage-1]?.Title || ''}</span>
      <Table
        isPagination={false}
        rows={data?.[currentPage-1]?.TableData || []}
        rowsPerPage={20}
      ></Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={handleChangePage}
      ></Pagination>
    </div>
  );
};

export default BalanceSheet;

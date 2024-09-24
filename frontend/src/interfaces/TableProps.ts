import TableRow from 'interfaces/TableRow';

interface TableProps {
    isPagination: Boolean;
    rows: TableRow[];
    rowsPerPage: number;
}

export default TableProps;
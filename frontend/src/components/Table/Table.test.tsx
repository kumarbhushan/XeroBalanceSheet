import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Table from './Table'; 
import TableProps from 'interfaces/TableProps';
import TableRow from 'interfaces/TableRow';

describe('Table Component', () => {
  const mockRows:TableRow[] = [
    { type:"Row", columns: ['Row 1'] },  
    { type:"Row", columns: ['Row 2'] },  
    { type:"Row", columns: ['Row 3'] },  
  ];

  const defaultProps: TableProps = {
    rows: mockRows,
    rowsPerPage: 2,
    isPagination: true,
  };

  test('renders the correct number of rows per page', () => {
    render(<Table {...defaultProps} />);

    // Only 2 rows should be displayed (as rowsPerPage = 2)
    expect(screen.getByText('Row 1')).toBeInTheDocument();
    expect(screen.getByText('Row 2')).toBeInTheDocument();
    expect(screen.queryByText('Row 3')).not.toBeInTheDocument(); // Row 3 should not be in the first page
  });

  test('renders without pagination if isPagination is false', () => {
    const noPaginationProps: TableProps = {
      ...defaultProps,
      isPagination: false,
    };
    render(<Table {...noPaginationProps} />);

    // The pagination controls should not be rendered
    expect(screen.queryByText('Page 1 of')).not.toBeInTheDocument();
  });
});

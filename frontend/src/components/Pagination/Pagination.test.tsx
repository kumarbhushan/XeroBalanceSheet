import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const onChangePageMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination with current page and total pages', () => {
    render(<Pagination currentPage={2} totalPages={5} onChangePage={onChangePageMock} />);

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  test('disables "Previous" button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onChangePage={onChangePageMock} />);

    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeEnabled();
  });

  test('disables "Next" button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onChangePage={onChangePageMock} />);

    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeEnabled();

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('calls onChangePage with the previous page number when "Previous" button is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} onChangePage={onChangePageMock} />);

    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);

    expect(onChangePageMock).toHaveBeenCalledWith(2);
  });

  test('calls onChangePage with the next page number when "Next" button is clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} onChangePage={onChangePageMock} />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(onChangePageMock).toHaveBeenCalledWith(4);
  });
});

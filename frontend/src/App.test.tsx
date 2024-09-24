import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Xero Balance Sheet', () => {
  render(<App />);
  const linkElement = screen.getByText(/Xero Balance Sheet/i);
  expect(linkElement).toBeInTheDocument();
});

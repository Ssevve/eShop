import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/renderWithProviders';
import Pagination from '.';
import { BrowserRouter } from 'react-router-dom';

describe('Pagination component', () => {
  it('should not render anything if total page count is 1', () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination totalResults={19} currentPage={1} siblingDelta={1} itemsPerPage={20} />
      </BrowserRouter>
    );
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should render first page button', () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination totalResults={200} currentPage={4} siblingDelta={1} itemsPerPage={30} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /page 1/i })).toBeInTheDocument();
  });

  it('should render middle page links', () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination totalResults={200} currentPage={4} siblingDelta={1} itemsPerPage={30} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /page 2/i })).toBeInTheDocument();
  });

  it('should render last page button', () => {
    const totalResults = 200;
    const itemsPerPage = 20;
    const totalPageCount = totalResults / itemsPerPage;
    renderWithProviders(
      <BrowserRouter>
        <Pagination
          totalResults={totalResults}
          currentPage={4}
          siblingDelta={1}
          itemsPerPage={itemsPerPage}
        />
      </BrowserRouter>
    );

    const lastPageLinkName = new RegExp(`page ${totalPageCount}`, 'i');
    expect(screen.getByRole('link', { name: lastPageLinkName })).toBeInTheDocument();
  });

  it("should render a 'previous page' link if current page is greater than 1", () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination totalResults={200} currentPage={2} siblingDelta={1} itemsPerPage={20} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /previous page/i })).toBeInTheDocument();
  });

  it("should not render a 'previous page' link if current page is 1", () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination totalResults={200} currentPage={1} siblingDelta={1} itemsPerPage={20} />
      </BrowserRouter>
    );
    expect(screen.queryByRole('link', { name: /previous page/i })).not.toBeInTheDocument();
  });

  it("should render a 'next page' link if current page is less than total page count", () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination totalResults={200} currentPage={1} siblingDelta={1} itemsPerPage={20} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /next page/i })).toBeInTheDocument();
  });

  it("should not render a 'next page' link if current page is equal to total page count", () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination totalResults={200} currentPage={10} siblingDelta={1} itemsPerPage={20} />
      </BrowserRouter>
    );
    expect(screen.queryByRole('link', { name: /next page/i })).not.toBeInTheDocument();
  });

  it("should render 'more previous pages' link if needed", () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination totalResults={200} currentPage={5} siblingDelta={1} itemsPerPage={20} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /page 3/i })).toHaveTextContent('...');
  });

  it("should render 'more next pages' link if needed", () => {
    renderWithProviders(
      <BrowserRouter>
        <Pagination totalResults={200} currentPage={5} siblingDelta={1} itemsPerPage={20} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /page 7/i })).toHaveTextContent('...');
  });
});

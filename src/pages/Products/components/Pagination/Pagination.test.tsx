import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithProviders from 'utils/renderWithProviders';
import Pagination from '.';

describe('Pagination component', () => {
  it('should not render anything if total page count is 1', () => {
    const setCurrentPageMock = vi.fn();
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={19}
        currentPage={1}
        siblingDelta={1}
        itemsPerPage={20}
      />
    );
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should render first page button', async () => {
    const setCurrentPageMock = vi.fn();
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={200}
        currentPage={4}
        siblingDelta={1}
        itemsPerPage={30}
      />
    );
    expect(screen.getByRole('button', { name: /page 1/i })).toBeInTheDocument();
  });

  it('should render last page button', async () => {
    const setCurrentPageMock = vi.fn();
    const totalItemCount = 200;
    const itemsPerPage = 20;
    const totalPageCount = totalItemCount / itemsPerPage;
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={totalItemCount}
        currentPage={4}
        siblingDelta={1}
        itemsPerPage={itemsPerPage}
      />
    );
    const lastPageButtonName = new RegExp(`page ${totalPageCount}`, 'i');
    expect(screen.getByRole('button', { name: lastPageButtonName })).toBeInTheDocument();
  });

  it('should call setCurrentPage on specific page button click', async () => {
    const setCurrentPageMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={200}
        currentPage={1}
        siblingDelta={1}
        itemsPerPage={20}
      />
    );

    await user.click(screen.getByRole('button', { name: /page 2/i }));
    expect(setCurrentPageMock).toHaveBeenCalledTimes(1);
    expect(setCurrentPageMock).toHaveBeenCalledWith(2);
  });

  it("should call setCurrentPage on 'previous page' button click", async () => {
    const setCurrentPageMock = vi.fn();
    const user = userEvent.setup();
    const currentPage = 2;
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={200}
        currentPage={currentPage}
        siblingDelta={1}
        itemsPerPage={20}
      />
    );

    await user.click(screen.getByRole('button', { name: /previous page/i }));
    expect(setCurrentPageMock).toHaveBeenCalledTimes(1);
    expect(setCurrentPageMock).toHaveBeenCalledWith(currentPage - 1);
  });

  it("should call setCurrentPage on 'next page' button click", async () => {
    const setCurrentPageMock = vi.fn();
    const user = userEvent.setup();
    const currentPage = 2;
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={200}
        currentPage={currentPage}
        siblingDelta={1}
        itemsPerPage={20}
      />
    );

    await user.click(screen.getByRole('button', { name: /next page/i }));
    expect(setCurrentPageMock).toHaveBeenCalledTimes(1);
    expect(setCurrentPageMock).toHaveBeenCalledWith(currentPage + 1);
  });

  it("should call setCurrentPage on 'more previous pages' button click", async () => {
    const setCurrentPageMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={200}
        currentPage={5}
        siblingDelta={1}
        itemsPerPage={20}
      />
    );

    await user.click(screen.getByRole('button', { name: /page 3/i }));
    expect(setCurrentPageMock).toHaveBeenCalledTimes(1);
    expect(setCurrentPageMock).toHaveBeenCalledWith(3);
  });

  it("should call setCurrentPage on 'more next pages' button click", async () => {
    const setCurrentPageMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={200}
        currentPage={5}
        siblingDelta={1}
        itemsPerPage={20}
      />
    );

    await user.click(screen.getByRole('button', { name: /page 7/i }));
    expect(setCurrentPageMock).toHaveBeenCalledTimes(1);
    expect(setCurrentPageMock).toHaveBeenCalledWith(7);
  });

  it("should render a 'previous page' button if current page is greater than 1", () => {
    const setCurrentPageMock = vi.fn();
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={200}
        currentPage={2}
        siblingDelta={1}
        itemsPerPage={20}
      />
    );
    expect(screen.getByRole('button', { name: /previous page/i })).toBeInTheDocument();
  });

  it("should not render a 'previous page' button if current page is 1", () => {
    const setCurrentPageMock = vi.fn();
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={200}
        currentPage={1}
        siblingDelta={1}
        itemsPerPage={20}
      />
    );
    expect(screen.queryByRole('button', { name: /previous page/i })).not.toBeInTheDocument();
  });

  it("should render a 'next page' button if current page is less than total page count", () => {
    const setCurrentPageMock = vi.fn();
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={200}
        currentPage={1}
        siblingDelta={1}
        itemsPerPage={20}
      />
    );
    expect(screen.getByRole('button', { name: /next page/i })).toBeInTheDocument();
  });

  it("should not render a 'next page' button if current page is equal to total page count", () => {
    const setCurrentPageMock = vi.fn();
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={200}
        currentPage={10}
        siblingDelta={1}
        itemsPerPage={20}
      />
    );
    expect(screen.queryByRole('button', { name: /next page/i })).not.toBeInTheDocument();
  });

  it("should render 'more previous pages' button if needed", async () => {
    const setCurrentPageMock = vi.fn();
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={200}
        currentPage={5}
        siblingDelta={1}
        itemsPerPage={20}
      />
    );
    expect(screen.getByRole('button', { name: /page 3/i })).toHaveTextContent('...');
  });

  it("should call setCurrentPage with correct value on 'more previous pages' button click", async () => {
    const setCurrentPageMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={200}
        currentPage={5}
        siblingDelta={1}
        itemsPerPage={20}
      />
    );
    await user.click(screen.getByRole('button', { name: /page 3/i }));
    expect(setCurrentPageMock).toHaveBeenCalledTimes(1);
    expect(setCurrentPageMock).toHaveBeenCalledWith(3);
  });

  it("should render 'more next pages' button if needed", async () => {
    const setCurrentPageMock = vi.fn();
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={200}
        currentPage={5}
        siblingDelta={1}
        itemsPerPage={20}
      />
    );
    expect(screen.getByRole('button', { name: /page 7/i })).toHaveTextContent('...');
  });

  it("should call setCurrentPage with correct value on 'more next pages' button click", async () => {
    const setCurrentPageMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <Pagination
        setCurrentPage={setCurrentPageMock}
        totalItemCount={200}
        currentPage={5}
        siblingDelta={1}
        itemsPerPage={20}
      />
    );
    await user.click(screen.getByRole('button', { name: /page 7/i }));
    expect(setCurrentPageMock).toHaveBeenCalledTimes(1);
    expect(setCurrentPageMock).toHaveBeenCalledWith(7);
  });
});

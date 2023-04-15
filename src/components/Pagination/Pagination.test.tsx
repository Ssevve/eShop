import { fireEvent, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import renderWithProviders from 'utils/renderWithProviders';
import Pagination from './Pagination';

describe('Pagination', () => {
  describe('When specific page buttons are clicked', () => {
    test('Calls setCurrentPage on page button click', async () => {
      const setCurrentPage = vi.fn();
      renderWithProviders(
        <Pagination
          setCurrentPage={setCurrentPage}
          totalItemCount={200}
          currentPage={1}
          pageLimit={3}
          itemsPerPage={20}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /page 3/i }));
      expect(setCurrentPage).toHaveBeenCalledTimes(1);
    });

    test('Calls setCurrentPage with correct value on specific page click', async () => {
      const setCurrentPage = vi.fn();
      renderWithProviders(
        <Pagination
          setCurrentPage={setCurrentPage}
          totalItemCount={200}
          currentPage={1}
          pageLimit={3}
          itemsPerPage={20}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /page 3/i }));
      expect(setCurrentPage).toHaveBeenCalledWith(3);
    });
  });

  describe('When there is only 1 page', () => {
    test('Renders nothing', () => {
      renderWithProviders(
        <Pagination
          setCurrentPage={() => {}}
          totalItemCount={19}
          currentPage={1}
          pageLimit={3}
          itemsPerPage={20}
        />
      );
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  describe('When there are 10 pages', () => {
    test('Renders a previous page button', () => {
      renderWithProviders(
        <Pagination
          setCurrentPage={() => {}}
          totalItemCount={200}
          currentPage={1}
          pageLimit={3}
          itemsPerPage={20}
        />
      );
      expect(
        screen.getByRole('button', { name: /previous page/i })
      ).toBeInTheDocument();
    });

    test('Renders a next page button', () => {
      renderWithProviders(
        <Pagination
          setCurrentPage={() => {}}
          totalItemCount={200}
          currentPage={1}
          pageLimit={3}
          itemsPerPage={20}
        />
      );
      expect(
        screen.getByRole('button', { name: /next page/i })
      ).toBeInTheDocument();
    });

    test('Renders a disabled previous page button if current page is 1', () => {
      renderWithProviders(
        <Pagination
          setCurrentPage={() => {}}
          totalItemCount={200}
          currentPage={1}
          pageLimit={3}
          itemsPerPage={20}
        />
      );
      expect(
        screen.getByRole('button', { name: /previous page/i })
      ).toBeDisabled();
    });

    test('Renders a not disabled previous page button if current page is more than 1', () => {
      renderWithProviders(
        <Pagination
          setCurrentPage={() => {}}
          totalItemCount={200}
          currentPage={2}
          pageLimit={3}
          itemsPerPage={20}
        />
      );
      expect(
        screen.getByRole('button', { name: /previous page/i })
      ).not.toBeDisabled();
    });

    test('Renders a disabled next page button if current page is 10', () => {
      renderWithProviders(
        <Pagination
          setCurrentPage={() => {}}
          totalItemCount={200}
          currentPage={10}
          pageLimit={3}
          itemsPerPage={20}
        />
      );
      expect(screen.getByRole('button', { name: /next page/i })).toBeDisabled();
    });

    test('Renders a not disabled next page button if current page is less than 10', () => {
      renderWithProviders(
        <Pagination
          setCurrentPage={() => {}}
          totalItemCount={200}
          currentPage={9}
          pageLimit={3}
          itemsPerPage={20}
        />
      );
      expect(
        screen.getByRole('button', { name: /next page/i })
      ).not.toBeDisabled();
    });

    test('Renders a second page button as "..." if current page is 4', () => {
      renderWithProviders(
        <Pagination
          setCurrentPage={() => {}}
          totalItemCount={200}
          currentPage={4}
          pageLimit={3}
          itemsPerPage={20}
        />
      );
      expect(screen.getByRole('button', { name: /page 2/i })).toHaveTextContent(
        '...'
      );
    });

    test('Renders a sixth page button as "..." if current page is 4', () => {
      renderWithProviders(
        <Pagination
          setCurrentPage={() => {}}
          totalItemCount={200}
          currentPage={4}
          pageLimit={3}
          itemsPerPage={20}
        />
      );
      expect(screen.getByRole('button', { name: /page 6/i })).toHaveTextContent(
        '...'
      );
    });

    test('Renders two "..." button if current page is 4', () => {
      renderWithProviders(
        <Pagination
          setCurrentPage={() => {}}
          totalItemCount={200}
          currentPage={4}
          pageLimit={3}
          itemsPerPage={20}
        />
      );
      expect(screen.getAllByText('...')).toHaveLength(2);
    });

    test('Renders only one "..." button if current page is less than 4', () => {
      renderWithProviders(
        <Pagination
          setCurrentPage={() => {}}
          totalItemCount={200}
          currentPage={3}
          pageLimit={3}
          itemsPerPage={20}
        />
      );
      expect(screen.getAllByText('...')).toHaveLength(1);
    });

    test('Renders a fourth page button as "..." if current page is 1', () => {
      renderWithProviders(
        <Pagination
          setCurrentPage={() => {}}
          totalItemCount={200}
          currentPage={1}
          pageLimit={3}
          itemsPerPage={20}
        />
      );
      expect(screen.getByRole('button', { name: /page 4/i })).toHaveTextContent(
        '...'
      );
    });

    test('Renders only one "..." button if current page is more than 8', () => {
      renderWithProviders(
        <Pagination
          setCurrentPage={() => {}}
          totalItemCount={200}
          currentPage={8}
          pageLimit={3}
          itemsPerPage={20}
        />
      );
      expect(screen.getAllByText('...')).toHaveLength(1);
    });

    test('Renders a seventh page button as "..." if current page is 10', () => {
      renderWithProviders(
        <Pagination
          setCurrentPage={() => {}}
          totalItemCount={200}
          currentPage={10}
          pageLimit={3}
          itemsPerPage={20}
        />
      );
      expect(screen.getByRole('button', { name: /page 7/i })).toHaveTextContent(
        '...'
      );
    });
  });
});

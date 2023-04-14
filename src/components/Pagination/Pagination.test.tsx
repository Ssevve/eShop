import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import renderWithProviders from 'utils/renderWithProviders';
import Pagination from './Pagination';

describe('Pagination', () => {
  test('Renders a previous page button', () => {
    renderWithProviders(
      <Pagination
        onPageClick={() => {}}
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
});

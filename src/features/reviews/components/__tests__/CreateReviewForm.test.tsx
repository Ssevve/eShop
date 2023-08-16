import { productsMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { CreateReviewForm } from '../CreateReviewForm';

describe('CreateReviewForm component', () => {
  it('should render <CloseMenuButton /> component', () => {
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <CreateReviewForm close={closeMock} product={productsMock[0]} />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('should render link to the product page', () => {
    const expectedProduct = productsMock[0];
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <CreateReviewForm close={closeMock} product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', `/products/${expectedProduct._id}`);
  });

  it('should render product image with correct src attribute', () => {
    const expectedProduct = productsMock[0];
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <CreateReviewForm close={closeMock} product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByAltText(expectedProduct.name)).toHaveAttribute(
      'src',
      expectedProduct.imageUrl
    );
  });

  it('should render product name', () => {
    const expectedProduct = productsMock[0];
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <CreateReviewForm close={closeMock} product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(expectedProduct.name)).toBeInTheDocument();
  });

  it('should render cancel button', () => {
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <CreateReviewForm close={closeMock} product={productsMock[0]} />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('should close on cancel button click', async () => {
    const closeMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <CreateReviewForm close={closeMock} product={productsMock[0]} />
      </BrowserRouter>
    );

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  it('should render form', () => {
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <CreateReviewForm close={closeMock} product={productsMock[0]} />
      </BrowserRouter>
    );
    expect(screen.getByRole('form', { name: /create review/i })).toBeInTheDocument();
  });

  it('should render submit button with correct text', () => {
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <CreateReviewForm close={closeMock} product={productsMock[0]} />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });
});

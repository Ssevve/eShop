import { productsMock, reviewsMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { EditReviewForm } from '../EditReviewForm';

describe('EditReviewForm component', () => {
  it('should render <CloseMenuButton /> component', () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <EditReviewForm review={expectedReview} close={closeMock} product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('should render link to the product page', () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <EditReviewForm review={expectedReview} close={closeMock} product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', `/products/${expectedProduct._id}`);
  });

  it('should render product image with correct src attribute', () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <EditReviewForm review={expectedReview} close={closeMock} product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByAltText(expectedProduct.name)).toHaveAttribute(
      'src',
      expectedProduct.imageUrl
    );
  });

  it('should render product name', () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <EditReviewForm review={expectedReview} close={closeMock} product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(expectedProduct.name)).toBeInTheDocument();
  });

  it('should render cancel button', () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <EditReviewForm review={expectedReview} close={closeMock} product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('should close on cancel button click', async () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    const closeMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <EditReviewForm review={expectedReview} close={closeMock} product={expectedProduct} />
      </BrowserRouter>
    );

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  it('should render form', () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <EditReviewForm review={expectedReview} close={closeMock} product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByRole('form', { name: /edit review/i })).toBeInTheDocument();
  });

  it('should render with correct initial rating', () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <EditReviewForm review={expectedReview} close={closeMock} product={expectedProduct} />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(expectedReview.rating, { exact: false })).toBeChecked();
  });

  it('should render with correct initial message', () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <EditReviewForm review={expectedReview} close={closeMock} product={expectedProduct} />
      </BrowserRouter>
    );

    expect(screen.getByRole('textbox')).toHaveValue(expectedReview.message);
  });

  it('should render submit button with correct text', () => {
    const expectedProduct = productsMock[0];
    const expectedReview = reviewsMock[0];
    const closeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <EditReviewForm review={expectedReview} close={closeMock} product={expectedProduct} />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });
});

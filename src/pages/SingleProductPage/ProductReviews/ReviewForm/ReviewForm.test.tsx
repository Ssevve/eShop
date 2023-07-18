import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/renderWithProviders';
import reviewsMock from 'mocks/reviewsMock';
import productsMock from 'mocks/productsMock';
import ReviewForm from '.';

describe('ReviewForm', () => {
  it('should render create form if isEditForm prop is not provided', () => {
    renderWithProviders(<ReviewForm productId={productsMock[0]._id} />);
    expect(screen.getByRole('form', { name: /create review/i })).toBeInTheDocument();
  });

  it('should render submit button with correct text for create form', () => {
    renderWithProviders(<ReviewForm productId={productsMock[0]._id} />);
    expect(screen.getByRole('button', { name: /create review/i })).toBeInTheDocument();
  });

  it('should render edit form if isEditForm prop is true', async () => {
    const setIsEditingMock = vi.fn();
    renderWithProviders(
      <ReviewForm isEditForm setIsEditing={setIsEditingMock} review={reviewsMock[0]} />
    );
    expect(screen.getByRole('form', { name: /edit review/i })).toBeInTheDocument();
  });

  it('should render submit button with correct text for edit form', async () => {
    const setIsEditingMock = vi.fn();
    renderWithProviders(
      <ReviewForm isEditForm setIsEditing={setIsEditingMock} review={reviewsMock[0]} />
    );
    expect(screen.getByRole('button', { name: /edit review/i })).toBeInTheDocument();
  });

  it('should render edit form with correct initial values', async () => {
    const setIsEditingMock = vi.fn();
    const expectedReview = reviewsMock[0];
    renderWithProviders(
      <ReviewForm isEditForm setIsEditing={setIsEditingMock} review={expectedReview} />
    );
    expect(screen.getByLabelText(expectedReview.rating)).toBeChecked();
    expect(screen.getByRole('textbox', { name: /message/i })).toHaveValue(expectedReview.message);
  });
});

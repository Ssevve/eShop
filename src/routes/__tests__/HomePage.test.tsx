import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../HomePage';

describe('HomePage', () => {
  it('should render an image', () => {
    renderWithProviders(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render heading element', () => {
    renderWithProviders(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should render paragraph element', () => {
    renderWithProviders(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(
      screen.getByText('Lorem ipsum dolor sit amet consectetur adipisicing elit.', { exact: false })
    ).toBeInTheDocument();
  });

  it('should render shop link', () => {
    renderWithProviders(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /shop now/i })).toBeInTheDocument();
  });
});

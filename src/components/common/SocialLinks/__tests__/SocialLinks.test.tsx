import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { SocialLinks } from '../SocialLinks';
import { BrowserRouter } from 'react-router-dom';

describe('SocialLinks component', () => {
  it('should render facebook link', () => {
    renderWithProviders(
      <BrowserRouter>
        <SocialLinks />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/facebook page/i)).toBeInTheDocument();
  });

  it('should render instagram link', () => {
    renderWithProviders(
      <BrowserRouter>
        <SocialLinks />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/instagram page/i)).toBeInTheDocument();
  });

  it('should render twitter link', () => {
    renderWithProviders(
      <BrowserRouter>
        <SocialLinks />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/twitter page/i)).toBeInTheDocument();
  });
});

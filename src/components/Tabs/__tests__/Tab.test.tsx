import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Tab } from '../Tab';
import { Tab as TabType } from '../types';

describe('Tab component', () => {
  it('should render correct label', () => {
    const expectedTab: TabType = {
      id: 1,
      label: 'Test tab',
      path: '/test',
    };
    renderWithProviders(
      <BrowserRouter>
        <Tab tab={expectedTab} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: expectedTab.label })).toBeInTheDocument();
  });

  it('should render with correct href for path tab', () => {
    const expectedTab: TabType = {
      id: 1,
      label: 'Test tab',
      path: '/test',
    };
    renderWithProviders(
      <BrowserRouter>
        <Tab tab={expectedTab} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: expectedTab.label })).toHaveAttribute(
      'href',
      expectedTab.path
    );
  });

  it('should render with correct href for default tab', () => {
    const expectedTab: TabType = {
      id: 1,
      label: 'Test tab',
      default: true,
    };
    renderWithProviders(
      <BrowserRouter>
        <Tab tab={expectedTab} />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: expectedTab.label })).toHaveAttribute('href', '/');
  });
});

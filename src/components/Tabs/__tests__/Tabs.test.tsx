import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Tabs } from '../Tabs';
import { Tab } from '../types';

describe('Tabs component', () => {
  it('should render all tabs', () => {
    const expectedTabs: Tab[] = [
      {
        id: 1,
        label: 'Test tab 1',
        default: true,
      },
      {
        id: 2,
        label: 'Test tab 2',
        path: '/test2',
      },
    ];
    renderWithProviders(
      <BrowserRouter>
        <Tabs tabs={expectedTabs} />
      </BrowserRouter>
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});

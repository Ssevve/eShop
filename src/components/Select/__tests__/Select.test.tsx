import { productsSortOptionsMock } from '@/mocks';
import renderWithProviders from '@/utils/renderWithProviders';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Select } from '../Select';

describe('Select component', () => {
  it('should correctly render default label', () => {
    const onChangeMock = vi.fn();
    renderWithProviders(
      <BrowserRouter>
        <Select label="test label" onChange={onChangeMock} options={productsSortOptionsMock} />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /test label/i })).toBeInTheDocument();
  });

  it('should show all options on click', async () => {
    const onChangeMock = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <Select label="test label" onChange={onChangeMock} options={productsSortOptionsMock} />
      </BrowserRouter>
    );
    await user.click(screen.getByRole('button', { name: /test label/i }));
    expect(screen.getByRole('button', { name: /test option 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /test option 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /test option 3/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /test option 4/i })).toBeInTheDocument();
  });

  it('should hide options on mouse leave', async () => {
    const onChangeMock = vi.fn();
    const user = userEvent.setup();
    const testOption = productsSortOptionsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <Select label="test label" onChange={onChangeMock} options={productsSortOptionsMock} />
      </BrowserRouter>
    );

    const selectButton = screen.getByRole('button', { name: /test label/i });
    await user.click(selectButton);
    expect(screen.getByRole('button', { name: /test option 1/i })).toBeInTheDocument();
    await user.unhover(selectButton);
    expect(screen.queryByRole('button', { name: /test option 1/i })).not.toBeInTheDocument();
  });

  it('should call onChange on option click', async () => {
    const onChangeMock = vi.fn();
    const user = userEvent.setup();
    const testOption = productsSortOptionsMock[0];
    renderWithProviders(
      <BrowserRouter>
        <Select label="test label" onChange={onChangeMock} options={productsSortOptionsMock} />
      </BrowserRouter>
    );
    await user.click(screen.getByRole('button', { name: /test label/i }));
    await fireEvent.click(screen.getByRole('button', { name: testOption.label }));
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(testOption);
  });
});

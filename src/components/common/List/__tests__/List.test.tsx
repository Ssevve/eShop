import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { List } from '../List';
import { productsMock } from '@/mocks';

describe('List component', () => {
  it('should render list with correct className', () => {
    renderWithProviders(
      <List
        items={productsMock}
        renderItem={({ name }) => <span>{name}</span>}
        emptyItemsMessage="empty items message"
        className="divide-y p-4"
      />
    );
    expect(screen.getByRole('list')).toHaveClass('divide-y p-4');
  });

  it('should render all items', () => {
    renderWithProviders(
      <List
        items={productsMock}
        renderItem={({ name }) => <span>{name}</span>}
        emptyItemsMessage="empty items message"
      />
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(productsMock.length);
    expect(screen.queryByText('empty items message')).not.toBeInTheDocument();
  });

  it("should render 'empty items message' if items array is empty", () => {
    renderWithProviders(
      <List items={[]} renderItem={() => <span />} emptyItemsMessage="empty items message" />
    );
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.queryByText('empty items message')).toBeInTheDocument();
  });

  it("should render 'empty items message' if items array is empty", () => {
    renderWithProviders(
      <List items={[]} renderItem={() => <span />} emptyItemsMessage="empty items message" />
    );
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.getByText('empty items message')).toBeInTheDocument();
  });

  it("should render 'empty items message' with correct className", () => {
    renderWithProviders(
      <List
        items={[]}
        renderItem={() => <span />}
        emptyItemsMessage="empty items message"
        emptyItemsMessageClass="mt-4 p-4"
      />
    );
    expect(screen.getByText('empty items message')).toHaveClass('mt-4 p-4');
  });
});

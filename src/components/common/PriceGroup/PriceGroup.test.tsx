import renderWithProviders from '@/utils/renderWithProviders';
import { screen } from '@testing-library/react';
import PriceGroup from '.';

describe('PriceGroup component', () => {
  it('should render single price if price is the same as discountPrice', async () => {
    const price = 5;
    renderWithProviders(<PriceGroup price={price} discountPrice={price} />);
    const prices = await screen.findAllByText('$5.00');
    expect(prices).toHaveLength(1);
  });

  it('should render two prices if price is greater than discountPrice', () => {
    const price = 5;
    const discountPrice = 2;
    renderWithProviders(<PriceGroup price={price} discountPrice={discountPrice} />);
    expect(screen.getByText('$5.00')).toBeInTheDocument();
    expect(screen.getByText('$2.00')).toBeInTheDocument();
  });
});

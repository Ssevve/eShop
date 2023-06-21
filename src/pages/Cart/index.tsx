import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  clearCart,
  selectCartTotal,
  selectCartOriginalPrice,
  selectCartDiscount,
  selectCartProductCount,
} from 'features/cart/cartSlice';
import formatPriceString from 'utils/formatPriceString';
import Button from 'components/common/Button';
import CartProduct from './components/CartProduct';

function Cart() {
  const dispatch = useAppDispatch();
  const productCount = useAppSelector(selectCartProductCount);
  const originalPrice = useAppSelector(selectCartOriginalPrice);
  const orderTotal = useAppSelector(selectCartTotal);
  const discount = useAppSelector(selectCartDiscount);
  const products = useAppSelector((state) => state.cart.products);

  const handleClearCart = () => dispatch(clearCart());
  return (
    <div className="align-center container mx-auto flex flex-col justify-center gap-4 lg:flex-row">
      <section className="w-full lg:w-3/4">
        <header className="flex items-center justify-between border-b py-3">
          <h1 className="text-2xl font-bold">{`Cart (${productCount})`}</h1>
          <Button variant="neutral" onClick={handleClearCart}>
            Clear cart
          </Button>
        </header>
        <ul>
          {products.length ? (
            products.map(({ quantity, product }) => (
              <li key={product._id}>
                <CartProduct initialQuantity={quantity} product={product} />
              </li>
            ))
          ) : (
            <p className="mt-3 text-lg">Your cart is empty!</p>
          )}
        </ul>
      </section>
      <section className="flex h-max w-full flex-col gap-3 bg-gray-200 p-3 lg:mt-3 lg:w-1/4">
        <div>
          <div className="flex justify-between">
            <span>Original price:</span>
            <span>{formatPriceString(originalPrice)}</span>
          </div>
          <div className="flex justify-between text-red-700">
            <span>Saved:</span>
            <span>{formatPriceString(discount)}</span>
          </div>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Order total:</span>
          <span>{formatPriceString(orderTotal)}</span>
        </div>
        <Button onClick={() => {}} fullWidth>
          Checkout
        </Button>
      </section>
    </div>
  );
}

export default Cart;

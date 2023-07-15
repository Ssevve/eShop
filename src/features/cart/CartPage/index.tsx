import { useAppDispatch, useAppSelector } from 'app/hooks';
import { clearCart, selectCartProductCount, selectCartProducts } from 'features/cart/cartSlice';
import Button from 'components/common/Button';
import CartProductList from './CartProductList';
import OrderDetails from './OrderDetails';

function CartPage() {
  const dispatch = useAppDispatch();
  const productCount = useAppSelector(selectCartProductCount);
  const products = useAppSelector(selectCartProducts);

  return (
    <section className="mx-auto mb-auto flex w-full flex-col justify-center gap-4 self-start lg:flex-row">
      <section className="w-full lg:w-3/4">
        <header className="flex items-center justify-between border-b pb-6 pt-3">
          <h1 className="text-2xl font-bold">{`Cart (${productCount})`}</h1>
          <Button variant="neutral" onClick={() => dispatch(clearCart())}>
            Clear cart
          </Button>
        </header>
        {products.length ? (
          <CartProductList products={products} />
        ) : (
          <p className="w-full py-12 text-center text-5xl font-bold text-gray-200 md:text-6xl">
            Your cart is empty!
          </p>
        )}
      </section>
      <OrderDetails />
    </section>
  );
}

export default CartPage;

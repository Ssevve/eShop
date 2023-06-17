import { useAppDispatch, useAppSelector } from 'app/hooks';
import { clearCart, selectCartProductCount } from 'features/cart/cartSlice';
import Button from 'components/common/Button';
import CartProduct from './components/CartProduct';

function Cart() {
  const dispatch = useAppDispatch();
  const productCount = useAppSelector(selectCartProductCount);
  const products = useAppSelector((state) => state.cart.products);

  const handleClearCart = () => dispatch(clearCart());
  return (
    <div className="align-center container mx-auto flex gap-4">
      <section className="w-3/4">
        <header className="flex justify-between border-b py-3">
          <h1 className="text-2xl font-bold">{`Cart (${productCount})`}</h1>
          <Button onClick={handleClearCart}>Clear cart</Button>
        </header>
        <section>
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
      </section>
      <section className="w-1/4 border">
        <p>more info</p>
        {/* Price before discounts */}
        {/* Total discounts */}
        {/* Total price */}
        {/* Checkout */}
      </section>
    </div>
  );
}

export default Cart;

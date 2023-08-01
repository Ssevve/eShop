import { Button } from '@/components/common/Button';
import { CartProductList, CartSummary } from '@/features/carts';
import { cartsApi } from '../api';
import { Loader } from '@/components/common/Loader';

export function CartPage() {
  const { data: cart, isFetching, isUninitialized } = cartsApi.endpoints.getCart.useQueryState();

  const isLoading = isFetching || isUninitialized;

  return (
    <section className="mx-auto mb-auto flex w-full flex-col justify-center gap-4 self-start lg:flex-row">
      <section className="w-full lg:w-3/4">
        <header className="flex items-center justify-between border-b pb-6 pt-3">
          <h1 className="text-2xl font-bold">{`Cart (${cart?.totalProductAmount || 0})`}</h1>
          <Button variant="neutral" disabled={isLoading}>
            Clear cart
          </Button>
        </header>
        <div className="mt-4">
          {isLoading ? <Loader /> : <CartProductList products={cart?.products} />}
        </div>
      </section>
      <CartSummary />
    </section>
  );
}

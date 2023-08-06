import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { CartProductList, CartSummary } from '@/features/carts';
import { cartsApi } from '../api';

export function CartPage() {
  const { data: cart, isLoading, isUninitialized } = cartsApi.endpoints.getCart.useQueryState();

  const isLoadingData = isLoading || isUninitialized;

  return (
    <section className="mx-auto mb-auto flex w-full flex-col justify-center gap-4 self-start lg:flex-row">
      <section className="w-full lg:w-3/4">
        <header className="flex items-center justify-between border-b pb-6 pt-3">
          <h1 className="text-2xl font-bold">{`Cart (${cart?.totalProductAmount || 0})`}</h1>
          <Button variant="neutral" disabled={isLoadingData}>
            Clear cart
          </Button>
        </header>
        <div className="mt-4">
          {isLoadingData ? <Loader /> : <CartProductList products={cart?.products} />}
        </div>
      </section>
      <CartSummary />
    </section>
  );
}

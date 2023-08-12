import { Loader } from '@/components/common/Loader';
import { useGetCartQuery } from '@/features/carts';
import { Filters } from '@/features/filters';
import { PaginatedProducts, useGetProductsQuery } from '@/features/products';
import { ErrorPage } from '@/routes';
import { useSearchParams } from 'react-router-dom';

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { isLoading: isLoadingCart, isUninitialized: isUninitializedCart } = useGetCartQuery();
  const {
    data,
    isError: isErrorProducts,
    isFetching: isFetchingProducts,
  } = useGetProductsQuery({
    page,
    category: searchParams.get('category'),
    sort: searchParams.get('sort'),
    order: searchParams.get('order'),
  });

  const isFetchingData = isFetchingProducts || isUninitializedCart || isLoadingCart;

  return (
    <section className="mx-auto flex h-full w-full flex-col gap-8 py-8">
      {isErrorProducts ? (
        <ErrorPage />
      ) : (
        <>
          <Filters />
          {isFetchingData ? (
            <Loader />
          ) : (
            <PaginatedProducts
              currentPage={page}
              products={data?.products || []}
              totalResults={data?.totalResults || 0}
              productsPerPage={data?.productsPerPage || 0}
            />
          )}
        </>
      )}
    </section>
  );
}

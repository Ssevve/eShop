import { Loader } from '@/components/common/Loader';
import { Filters } from '@/features/filters';
import { PaginatedProducts, useGetProductsQuery } from '@/features/products';
import { ErrorPage } from '@/routes';
import { useSearchParams } from 'react-router-dom';

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data, isError, isFetching } = useGetProductsQuery({
    page,
    category: searchParams.get('category'),
    sort: searchParams.get('sort'),
    order: searchParams.get('order'),
  });

  return (
    <section className="mx-auto flex h-full w-full flex-col gap-6">
      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <Filters />
          {isFetching ? (
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

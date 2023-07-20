import { useGetProductsQuery } from '@/app/services/products';
import Loader from '@/components/common/Loader';
import Filters from '@/features/filters/Filters';
import ErrorPage from '@/pages/ErrorPage';
import { useSearchParams } from 'react-router-dom';
import PaginatedProducts from './PaginatedProducts';

function ProductsPage() {
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

export default ProductsPage;

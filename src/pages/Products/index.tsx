import ProductList from './components/ProductList';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from 'features/products/productsSlice';
import Error from 'pages/Error';
import Loader from 'components/common/Loader';

function Products() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data, isError, isFetching } = useGetProductsQuery({
    page,
    category: searchParams.get('category'),
    sort: searchParams.get('sort'),
    order: searchParams.get('order'),
  });

  const PaginatedProducts = () =>
    isFetching ? (
      <Loader />
    ) : (
      <>
        <ProductList products={data?.products || []} />
        <Pagination
          currentPage={page}
          totalResults={data?.totalResults || 0}
          productsPerPage={data?.productsPerPage || 0}
        />
      </>
    );

  return (
    <section className="mx-auto flex h-full w-full flex-col gap-6">
      {isError ? (
        <Error />
      ) : (
        <>
          <Filters />
          <PaginatedProducts />
        </>
      )}
    </section>
  );
}

export default Products;

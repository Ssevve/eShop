import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SortOrder from 'types/SortOrder';
import { useGetProductsQuery } from 'app/services/products';
import PageLoader from 'components/common/PageLoader';
import Pagination from './components/Pagination';
import ProductList from './components/ProductList';
import Filters from './components/Filters';

function Products() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  const currentPage = Number(searchParams.get('page')) || 1;
  const { data, error, isFetching } = useGetProductsQuery({
    page: currentPage,
    category: searchParams.get('category'),
    sortOrder: searchParams.get('order') as SortOrder,
  });

  const productsPerPage = data?.productsPerPage || 0;
  const products = data?.products || [];
  const totalProductCount = data?.totalResults || 0;

  if (error) {
    return (
      <>
        <span className="text-xl font-bold">Error!</span>
        <p className="mt-2">Could not get data from the server. Please try again later.</p>
      </>
    );
  }
  if (isFetching) return <PageLoader />;
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Filters />
      <ProductList products={products} />
      <Pagination
        totalItemCount={totalProductCount}
        currentPage={currentPage}
        siblingDelta={1}
        itemsPerPage={productsPerPage}
      />
    </div>
  );
}

export default Products;

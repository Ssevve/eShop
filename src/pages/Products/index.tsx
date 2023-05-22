import { useSearchParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import ProductList from 'pages/Products/components/ProductList';
import Category from 'types/Category';
import SortOrder from 'types/SortOrder';
import Pagination from 'pages/Products/components/Pagination';
import { useGetProductsQuery } from 'services/api';
import theme from 'theme';
import PageLoader from 'components/common/PageLoader';
import Filters from './components/Filters';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const { data, error, isFetching } = useGetProductsQuery({
    page: currentPage,
    category: searchParams.get('category') as Category,
    sortOrder: searchParams.get('order') as SortOrder,
  });

  const productsPerPage = data?.productsPerPage || 0;
  const products = data?.products || [];
  const totalProductCount = data?.totalResults || 0;

  const scrollToTop = () => window.scrollTo(0, 0);

  const handlePageChange = (page: number) => {
    scrollToTop();
    if (page === 1) searchParams.delete('page');
    else searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  if (error) {
    return (
      <>
        <span className="text-xl font-bold">Error!</span>
        <p className="mt-2">
          Could not get data from the server. Please try again later.
        </p>
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
        setCurrentPage={handlePageChange}
        currentPage={currentPage}
        siblingDelta={1}
        itemsPerPage={productsPerPage}
      />
    </div>
  );
}

export default Products;

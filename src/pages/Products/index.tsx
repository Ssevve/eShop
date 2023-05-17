import { useSearchParams } from 'react-router-dom';
import ProductList from 'pages/Products/components/ProductList';
import Category from 'types/Category';
import SortOrder from 'types/SortOrder';
import Pagination from 'pages/Products/components/Pagination';
import { useGetProductsQuery } from 'services/api';
import Filters from './components/Filters';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const productsPerPage = 10;
  const { data } = useGetProductsQuery({
    page: currentPage,
    category: searchParams.get('category') as Category,
    limit: productsPerPage,
    sortOrder: searchParams.get('order') as SortOrder,
  });

  const products = data?.products || [];
  const totalProductCount = data?.totalResults || 0;

  const setCurrentPage = (page: number) => {
    if (page === 1) searchParams.delete('page');
    else searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col gap-4">
      <Filters />
      <ProductList products={products} />
      <Pagination
        totalItemCount={totalProductCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        siblingDelta={1}
        itemsPerPage={productsPerPage}
      />
    </div>
  );
}

export default Products;

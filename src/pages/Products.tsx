import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Filters from 'features/filters/components/Filters/Filters';
import ProductList from 'features/products/components/ProductList/ProductList';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
    });
  }, [currentPage]);

  return (
    <div className="flex gap-4">
      <Filters />
      <ProductList currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Products;

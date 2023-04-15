import { useEffect, useState } from 'react';

import ProductList from 'features/products/components/ProductList/ProductList';
import { useSearchParams } from 'react-router-dom';

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
    <div>
      <ProductList currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Products;

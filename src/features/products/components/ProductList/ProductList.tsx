import { useEffect, useState } from 'react';
import { useAppSelector } from 'app/hooks';
import { selectSortedProducts } from 'features/products/productsSlice';

import Pagination from 'components/Pagination/Pagination';
import ProductCard from '../ProductCard/ProductCard';

interface ProductListProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function ProductList({ currentPage, setCurrentPage }: ProductListProps) {
  const [productsPerPage] = useState(10);
  const products = useAppSelector(selectSortedProducts);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const getCurrentPageProducts = () => {
    const startIndex = currentPage * productsPerPage - productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

  return (
    <div>
      <ul className="flex flex-wrap gap-8">
        {getCurrentPageProducts().map((product) => (
          <li key={product?.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <Pagination
        totalItemCount={products.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageLimit={3}
        itemsPerPage={productsPerPage}
      />
    </div>
  );
}

export default ProductList;

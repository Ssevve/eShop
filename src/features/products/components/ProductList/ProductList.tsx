import Pagination from 'components/Pagination/Pagination';
import { selectProducts } from 'features/products/productsSlice';
import { useState } from 'react';
import { useAppSelector } from 'app/hooks';
import ProductCard from '../ProductCard/ProductCard';

interface ProductListProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function ProductList({ currentPage, setCurrentPage }: ProductListProps) {
  const [productsPerPage] = useState(10);
  const products = Object.values(useAppSelector(selectProducts));

  const getCurrentPageProducts = () => {
    const startIndex = currentPage * productsPerPage - productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

  return (
    <>
      <ul className="flex flex-wrap">
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
    </>
  );
}

export default ProductList;

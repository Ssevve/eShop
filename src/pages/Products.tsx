import ProductList from 'features/products/components/ProductList/ProductList';
import Pagination from 'features/pagination/components/Pagination';

function Products() {
  return (
    <div>
      Products:
      <ProductList />
      <Pagination />
    </div>
  );
}

export default Products;

import ProductList from 'features/products/components/ProductList/ProductList';
import Pagination from 'components/Pagination';

function Products() {
  return (
    <div>
      Products:
      <ProductList />
      <Pagination pageLimit={3} productsPerPage={20} />
    </div>
  );
}

export default Products;

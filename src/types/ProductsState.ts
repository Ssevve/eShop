import Status from './Status';

export interface Product {
  id: string;
  productName: string;
  brand: string;
  price: number;
  discountPrice: number;
  imageUrl: string;
  quantity: string;
  category: string;
  subCategory: string;
}

interface ProductsState {
  products: Product[];
  totalProductCount: number | null;
  productsPerPage: number;
  currentPage: number;
  totalPageCount: number | null;
  status: Status;
}

export default ProductsState;

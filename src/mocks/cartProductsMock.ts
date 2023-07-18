import { CartProduct } from "features/cart/cartSlice";

const cartProductsMock: CartProduct[] = [
  {
    quantity: 1,
    product: {
      brand: 'Test brand 1',
      category: 'Test category 1',
      description: 'Test description 1',
      discountPrice: 5.28,
      imageUrl: 'Test image url 1',
      name: 'Test product 1',
      price: 5.86,
      quantity: 'Test quantity 1',
      rating: 5,
      ratingsCount: 23,
      _id: 'test-id',
    },
  },
  {
    quantity: 2,
    product: {
      brand: 'Test brand 2',
      category: 'Test category 2',
      description: 'Test description 2',
      discountPrice: 2.28,
      imageUrl: 'Test image url 2',
      name: 'Test product 2',
      price: 2.28,
      quantity: 'Test quantity 2',
      rating: 1,
      ratingsCount: 12,
      _id: 'test-id-2',
    },
  },
  {
    quantity: 3,
    product: {
      brand: 'Test brand 3',
      category: 'Test category 3',
      description: 'Test description 3',
      discountPrice: 2.28,
      imageUrl: 'Test image url 3',
      name: 'Test product 3',
      price: 3.86,
      quantity: 'Test quantity 3',
      rating: 3,
      ratingsCount: 2,
      _id: 'test-id-3',
    },
  },
];

export default cartProductsMock;

export interface CartProduct {
  amount: number;
  product: {
    _id: string;
    name: string;
    discountPrice: number;
    price: number;
    imageUrl: string;
    quantity: string;
  }
}

export interface CartState {
  products: CartProduct[];
}
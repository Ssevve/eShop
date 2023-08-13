export interface Review {
  _id: string;
  userFirstName: string;
  productId: string;
  userId: string;
  message?: string;
  rating: number;
  createdAt: string;
  updatedAt?: string;
}
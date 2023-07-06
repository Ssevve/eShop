interface Review {
  _id: string;
  productId: string;
  userId: string;
  message: string;
  rating: number;
}

export default Review;
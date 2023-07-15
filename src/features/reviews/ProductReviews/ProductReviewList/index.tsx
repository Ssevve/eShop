import { Review as ReviewType } from 'app/services/reviews';
import Review from 'features/reviews/Review';

function ProductReviewList({ reviews }: { reviews: ReviewType[] | undefined }) {
  return reviews?.length ? (
    <ul>
      {reviews.map((review) => (
        <li key={review._id}>
          <Review showAuthor key={review._id} review={review} />
        </li>
      ))}
    </ul>
  ) : (
    <p className="py-6">There are no reviews for this product yet!</p>
  );
}

export default ProductReviewList;

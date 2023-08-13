import { Modal, ModalProps } from '@/components/common/Modal';
import { useEditReviewMutation } from '../api';
import { RatingInputGroup } from './RatingInputGroup';
import { ReviewSchema } from '../lib/reviewSchema';
import { LoaderButton } from '@/components/common/LoaderButton';
import { Button } from '@/components/common/Button';
import { useForm } from 'react-hook-form';
import { Product } from '@/features/products';
import { Review } from '../types';
import { Link } from 'react-router-dom';

interface EditReviewFormProps extends Omit<ModalProps, 'children'> {
  product: Product;
  review: Review;
}

export function EditReviewForm({ product, review, close }: EditReviewFormProps) {
  const [editReview, { isLoading, isSuccess }] = useEditReviewMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewSchema>({
    defaultValues: {
      rating: review.rating.toString(),
      message: review.message || '',
    },
  });

  if (isSuccess) close();

  const onSubmit = async (data: ReviewSchema) => {
    const rating = Number(data.rating);
    const message = data.message;

    editReview({
      productId: review.productId,
      rating,
      message,
      reviewId: review._id,
    });
  };

  return (
    <Modal title="Edit review" close={close}>
      <Link
        to={`/products/${product._id}`}
        onClick={close}
        className="mb-8 mt-4 flex w-full items-center gap-8 hover:underline"
      >
        <img className="h-24 object-scale-down" src={product.imageUrl} alt={product.name} />
        <span>{product.name}</span>
      </Link>
      <form
        aria-label="Edit review"
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h4 className="mb-4 font-semibold">Rating</h4>
          <RatingInputGroup
            error={errors.rating}
            {...register('rating', { required: 'Rating is required' })}
          />
        </div>
        <label>
          <span className="font-semibold">Message</span> <span>(optional)</span>
          <textarea
            rows={8}
            {...register('message')}
            className="mt-4 w-0 min-w-full rounded-sm border p-4 font-normal"
          />
        </label>
        <div className="ml-auto flex gap-4">
          <LoaderButton type="submit" isLoading={isLoading}>
            Edit
          </LoaderButton>
          <Button onClick={close} variant="neutral">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

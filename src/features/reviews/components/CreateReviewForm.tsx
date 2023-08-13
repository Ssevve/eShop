import { Button } from '@/components/common/Button';
import { LoaderButton } from '@/components/common/LoaderButton';
import { RatingInputGroup } from '@/features/reviews/components/RatingInputGroup';
import { ReviewSchema } from '@/features/reviews/lib/reviewSchema';
import { useForm } from 'react-hook-form';
import { useCreateReviewMutation } from '../api';
import { Modal, ModalProps } from '@/components/common/Modal';
import { Product } from '@/features/products';
import { Link } from 'react-router-dom';

interface CreateReviewFormProps extends Omit<ModalProps, 'children'> {
  product: Product;
}

export function CreateReviewForm({ product, close }: CreateReviewFormProps) {
  const [createReview, { isLoading, isSuccess }] = useCreateReviewMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewSchema>({
    defaultValues: {
      rating: '',
      message: '',
    },
  });

  if (isSuccess) close();

  const onSubmit = async (data: ReviewSchema) => {
    const rating = Number(data.rating);
    const message = data.message;
    createReview({ productId: product._id, rating, message });
  };

  return (
    <Modal title="Create review" close={close}>
      <Link
        to={`/products/${product._id}`}
        onClick={close}
        className="mb-8 mt-4 flex w-full items-center gap-8 hover:underline"
      >
        <img className="h-24 object-scale-down" src={product.imageUrl} alt={product.name} />
        <span>{product.name}</span>
      </Link>
      <form
        aria-label="Create review"
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
            Create
          </LoaderButton>
          <Button onClick={close} variant="neutral">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

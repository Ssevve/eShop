import { useForm } from 'react-hook-form';
import { ReviewSchema } from 'features/reviews/lib/reviewSchema';
import ErrorBox from 'components/common/ErrorBox';
import RatingInputGroup from 'features/reviews/RatingInputGroup';
import SubmitButton from 'components/common/SubmitButton';
import Button from 'components/common/Button';
import { Review, useCreateReviewMutation, useEditReviewMutation } from 'app/services/reviews';

interface EditReviewFormProps {
  isEditForm: true;
  setIsEditing: (bool: boolean) => void;
  review: Review;
  productId?: never;
}

interface CreateReviewFormProps {
  isEditForm?: never;
  setIsEditing?: never;
  rating?: never;
  message?: never;
  reviewId?: never;
  review?: never;
  productId: string;
}

type ReviewFormProps = React.ComponentPropsWithoutRef<'form'> &
  (EditReviewFormProps | CreateReviewFormProps);

function ReviewForm({ isEditForm, setIsEditing, review, productId }: ReviewFormProps) {
  const [editReview, { isLoading: isLoadingEdit, isSuccess, isError: isErrorEdit }] =
    useEditReviewMutation();
  const [createReview, { isLoading: isLoadingCreate, isError: isErrorCreate }] =
    useCreateReviewMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewSchema>({
    defaultValues: {
      rating: review?.rating.toString() || '',
      message: review?.message || '',
    },
  });

  const onSubmit = (data: ReviewSchema) => {
    const rating = Number(data.rating);
    const message = data.message;

    return isEditForm
      ? editReview({
          productId: review.productId,
          rating,
          message,
          reviewId: review._id,
        })
      : createReview({ productId, rating, message });
  };

  const isLoading = isLoadingEdit || isLoadingCreate;
  const isError = isErrorEdit || isErrorCreate;
  const submitButtonText = isEditForm ? 'Edit review' : 'Create review';

  return (
    <form className="mt-6 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {isError && <ErrorBox />}
      <h4 className="font-semibold">Rating</h4>
      <RatingInputGroup
        error={errors.rating}
        {...register('rating', { required: 'Rating is required' })}
      />
      <label>
        <span className="font-semibold">Message</span> <span>(optional)</span>
        <textarea
          rows={10}
          {...register('message')}
          className="mt-3 w-0 min-w-full rounded-sm border p-3 font-normal"
        />
      </label>
      <div className="flex gap-3">
        <SubmitButton isLoading={isLoading}>{submitButtonText}</SubmitButton>
        {isEditForm && (
          <Button onClick={() => setIsEditing(false)} variant="neutral">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export default ReviewForm;

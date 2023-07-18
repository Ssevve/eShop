import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Review, useCreateReviewMutation, useEditReviewMutation } from 'app/services/reviews';
import { ReviewSchema } from 'features/reviews/lib/reviewSchema';
import ErrorBox from 'components/common/ErrorBox';
import RatingInputGroup from 'features/reviews/RatingInputGroup';
import SubmitButton from 'components/common/SubmitButton';
import Button from 'components/common/Button';

interface EditFormProps {
  isEditForm: true;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  review: Review;
  productId?: never;
}

interface CreateFormProps {
  isEditForm?: never;
  setIsEditing?: never;
  review?: never;
  productId: string;
}

type ReviewFormProps = EditFormProps | CreateFormProps;

function ReviewForm({ isEditForm, setIsEditing, review, productId }: ReviewFormProps) {
  const [editReview, { isLoading: isLoadingEdit, isError: isErrorEdit, isSuccess: isSuccessEdit }] =
    useEditReviewMutation();
  const [createReview, { isLoading: isLoadingCreate, isError: isErrorCreate }] =
    useCreateReviewMutation();

  useEffect(() => {
    if (isEditForm && isSuccessEdit) setIsEditing(false);
  }, [isSuccessEdit]);

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

  const onSubmit = async (data: ReviewSchema) => {
    const rating = Number(data.rating);
    const message = data.message;

    if (isEditForm) {
      editReview({
        productId: review.productId,
        rating,
        message,
        reviewId: review._id,
      });
    } else {
      createReview({ productId, rating, message });
    }
  };

  const isLoading = isLoadingEdit || isLoadingCreate;
  const isError = isErrorEdit || isErrorCreate;
  const accessibleName = isEditForm ? 'Edit review' : 'Create review';

  return (
    <form
      aria-label={accessibleName}
      className="mt-6 flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        <SubmitButton isLoading={isLoading}>{accessibleName}</SubmitButton>
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

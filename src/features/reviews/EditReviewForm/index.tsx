import { useForm, SubmitHandler } from 'react-hook-form';
import { useEditReviewMutation, Review } from 'app/services/reviews';
import { ReviewSchema } from '../lib/reviewSchema';
import ErrorBox from 'components/common/ErrorBox';
import RatingInputGroup from '../RatingInputGroup';
import SubmitButton from 'components/common/SubmitButton';
import Button from 'components/common/Button';

interface EditReviewFormProps {
  review: Review;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditReviewForm({ review, setIsEditing }: EditReviewFormProps) {
  const [editReview, { isLoading, isSuccess, error }] = useEditReviewMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewSchema>({
    defaultValues: {
      rating: review.rating.toString(),
      message: review.message,
    },
  });

  const onSubmit: SubmitHandler<ReviewSchema> = ({ rating, message }) => {
    editReview({
      reviewId: review._id,
      productId: review.productId,
      message: message?.trim(),
      rating: Number(rating),
    });

    if (isSuccess) setIsEditing(false);
  };

  let errorMessage: string | undefined;
  if (error && 'status' in error && error.status === 400) {
    errorMessage = JSON.stringify(error.data);
  }

  return (
    <form className="my-6 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBox title="Could not edit the review" errorMessage={errorMessage} />}
      <h4 className="font-semibold">Rating</h4>
      <RatingInputGroup error={errors.rating} {...register('rating')} />
      <label>
        <span className="font-semibold">Message</span> <span>(optional)</span>
        <textarea
          rows={10}
          {...register('message')}
          className="mt-3 w-0 min-w-full rounded-sm border p-3 font-normal"
        />
      </label>
      <div className="flex gap-3">
        <SubmitButton isLoading={isLoading}>Edit review</SubmitButton>
        <Button onClick={() => setIsEditing(false)} variant="neutral">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default EditReviewForm;

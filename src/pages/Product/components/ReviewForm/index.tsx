import { useForm, SubmitHandler } from 'react-hook-form';
import { useAddReviewMutation, useEditReviewMutation } from 'app/api';
import Review from 'types/Review';
import RatingInputGroup from '../RatingInputGroup';
import SubmitButton from 'components/common/SubmitButton';
import Button from 'components/common/Button';

interface EditReviewFormProps {
  isEditForm: true;
  review: Review;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  productId?: never;
}

interface CreateReviewFormProps {
  isEditForm?: never;
  review?: never;
  setIsEditing?: never;
  productId: string;
}

type ReviewFormProps = EditReviewFormProps | CreateReviewFormProps;

interface ReviewSchema {
  rating: string;
  message: string;
}

function ReviewForm(props: ReviewFormProps) {
  const { isEditForm } = props;

  const { register, handleSubmit } = useForm<ReviewSchema>({
    defaultValues: {
      rating: isEditForm ? props.review.rating.toString() : '5',
      message: isEditForm ? props.review.message : '',
    },
  });
  const [editReview, { isLoading: isLoadingEdit }] = useEditReviewMutation();
  const [createReview, { isLoading: isLoadingCreate }] = useAddReviewMutation();

  const onSubmit: SubmitHandler<ReviewSchema> = ({ rating, message }: ReviewSchema) => {
    if (isEditForm) {
      const { _id, productId } = props.review;
      return editReview({
        _id,
        productId,
        message: message.trim(),
        rating: Number(rating),
      });
    }

    const { productId } = props;
    return createReview({
      productId,
      message: message.trim(),
      rating: Number(rating),
    });
  };

  return (
    <form className="my-6" onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mb-3 font-semibold">Rating</h4>
      <RatingInputGroup {...register('rating')} />
      <label className="my-6 block">
        <span className="font-semibold">Message</span> <span>(optional)</span>
        <textarea
          rows={10}
          {...register('message')}
          className="mt-3 w-0 min-w-full rounded-sm border p-3 font-normal"
        />
      </label>
      <div className="flex gap-3">
        <SubmitButton isLoading={isEditForm ? isLoadingEdit : isLoadingCreate}>
          {isEditForm ? 'Edit review' : 'Create review'}
        </SubmitButton>
        {isEditForm && (
          <Button onClick={() => props.setIsEditing(false)} variant="neutral">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export default ReviewForm;

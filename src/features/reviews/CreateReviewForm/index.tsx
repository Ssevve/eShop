import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreateReviewMutation } from 'app/services/reviews';
import { ReviewSchema } from '../lib/reviewSchema';
import ErrorBox from 'components/common/ErrorBox';
import RatingInputGroup from '../RatingInputGroup';
import SubmitButton from 'components/common/SubmitButton';

interface CreateReviewFormProps {
  productId: string;
}

function CreateReviewForm({ productId }: CreateReviewFormProps) {
  const [createReview, { isLoading, error }] = useCreateReviewMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewSchema>();

  const onSubmit: SubmitHandler<ReviewSchema> = ({ rating, message }) => {
    return createReview({
      productId,
      message: message?.trim(),
      rating: rating,
    });
  };

  let errorMessage: string | undefined;
  if (error && 'status' in error && error.status === 400) {
    errorMessage = JSON.stringify(error.data);
  }

  return (
    <form className="my-6 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBox title="Could not create the review" errorMessage={errorMessage} />}
      <h4 className="font-semibold">Rating</h4>
      <RatingInputGroup error={errors.rating} {...register('rating', { required: true })} />
      <label>
        <span className="mr-1.5 font-semibold">Message</span>
        <span>(optional)</span>
        <textarea
          rows={10}
          {...register('message')}
          className="mt-3 w-0 min-w-full rounded-sm border p-3 font-normal"
        />
      </label>
      <div className="flex gap-3">
        <SubmitButton isLoading={isLoading}>Create review</SubmitButton>
      </div>
    </form>
  );
}

export default CreateReviewForm;

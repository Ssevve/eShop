import SubmitButton from 'components/common/SubmitButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiStar } from 'react-icons/fi';
import theme from 'lib/theme';
import { useAddReviewMutation } from 'app/api';
import Review from 'types/Review';
import Button from 'components/common/Button';

interface EditReviewFormProps {
  review: Review;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

interface EditReviewSchema {
  rating: string;
  message: string;
}

function EditReviewForm({ review, setIsEditing }: EditReviewFormProps) {
  const { register, handleSubmit } = useForm<EditReviewSchema>({
    defaultValues: {
      rating: review.rating.toString(),
      message: review.message,
    },
  });
  const [addReview, { isLoading: isAddingReview }] = useAddReviewMutation();

  // const onSubmit: SubmitHandler<EditReviewSchema> = ({ rating, message }: EditReviewSchema) =>
  //   addReview({ productId, userId, message, rating: Number(rating) });

  return (
    <form className="my-6">
      <h4 className="mb-3 font-semibold">Rating</h4>
      <ul className="rounded-sm border bg-white font-medium sm:flex">
        <li className="w-full border-b sm:border-b-0 sm:border-r">
          <label className="flex h-full w-full items-center justify-center p-3 hover:cursor-pointer">
            <input
              {...register('rating')}
              className="relative mr-1 h-4 w-4 appearance-none rounded-full border after:absolute checked:border-primary checked:after:left-1/2 checked:after:top-1/2 checked:after:h-2.5 checked:after:w-2.5 checked:after:rounded-full checked:after:bg-primary checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer"
              type="radio"
              value="1"
            />
            <span className="mr-1.5">1</span>{' '}
            <FiStar strokeWidth={0} fill={theme.colors.amber[300]} />
          </label>
        </li>
        <li className="w-full border-b sm:border-b-0 sm:border-r">
          <label className="flex h-full w-full items-center justify-center p-3 hover:cursor-pointer">
            <input
              {...register('rating')}
              className="relative mr-1 h-4 w-4 appearance-none rounded-full border after:absolute checked:border-primary checked:after:left-1/2 checked:after:top-1/2 checked:after:h-2.5 checked:after:w-2.5 checked:after:rounded-full checked:after:bg-primary checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer"
              type="radio"
              value="2"
            />
            <span className="mr-1.5">2</span>{' '}
            <FiStar strokeWidth={0} fill={theme.colors.amber[300]} />
          </label>
        </li>
        <li className="w-full border-b sm:border-b-0 sm:border-r">
          <label className="flex h-full w-full items-center justify-center p-3 hover:cursor-pointer">
            <input
              {...register('rating')}
              className="relative mr-1 h-4 w-4 appearance-none rounded-full border after:absolute checked:border-primary checked:after:left-1/2 checked:after:top-1/2 checked:after:h-2.5 checked:after:w-2.5 checked:after:rounded-full checked:after:bg-primary checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer"
              type="radio"
              value="3"
            />
            <span className="mr-1.5">3</span>{' '}
            <FiStar strokeWidth={0} fill={theme.colors.amber[300]} />
          </label>
        </li>
        <li className="w-full border-b sm:border-b-0 sm:border-r">
          <label className="flex h-full w-full items-center justify-center p-3 hover:cursor-pointer">
            <input
              {...register('rating')}
              className="relative mr-1 h-4 w-4 appearance-none rounded-full border after:absolute checked:border-primary checked:after:left-1/2 checked:after:top-1/2 checked:after:h-2.5 checked:after:w-2.5 checked:after:rounded-full checked:after:bg-primary checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer"
              type="radio"
              value="4"
            />
            <span className="mr-1.5">4</span>{' '}
            <FiStar strokeWidth={0} fill={theme.colors.amber[300]} />
          </label>
        </li>
        <li className="w-full">
          <label className="flex h-full w-full items-center justify-center p-3 hover:cursor-pointer">
            <input
              {...register('rating')}
              className="relative mr-1 h-4 w-4 appearance-none rounded-full border after:absolute checked:border-primary checked:after:left-1/2 checked:after:top-1/2 checked:after:h-2.5 checked:after:w-2.5 checked:after:rounded-full checked:after:bg-primary checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer"
              type="radio"
              value="5"
            />
            <span className="mr-1.5">5</span>{' '}
            <FiStar strokeWidth={0} fill={theme.colors.amber[300]} />
          </label>
        </li>
      </ul>
      <label className="my-6 block font-semibold">
        Message
        <textarea {...register('message')} className="mt-3 w-0 min-w-full rounded-sm border p-3" />
      </label>
      <div className="flex gap-3">
        <SubmitButton isLoading={isAddingReview}>Edit review</SubmitButton>
        <Button onClick={() => setIsEditing(false)} variant="neutral">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default EditReviewForm;

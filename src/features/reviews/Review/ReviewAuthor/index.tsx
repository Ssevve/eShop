import theme from '@/lib/theme';
import cherryAvatar from '@/assets/avatar-cherry.svg';

interface ReviewAuthorProps {
  name: string;
}

function ReviewAuthor({ name }: ReviewAuthorProps) {
  const avatarSize = theme.spacing[10];

  return (
    <>
      <img
        className="h-10 w-10 rounded-full"
        width={avatarSize}
        height={avatarSize}
        src={cherryAvatar}
        alt=""
      />
      <p className="font-medium">{name}</p>
    </>
  );
}

export default ReviewAuthor;

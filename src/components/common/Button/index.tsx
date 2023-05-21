import cx from 'classnames';

interface ButtonDefaultProps {
  textSize?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
}

interface ButtonProps extends ButtonDefaultProps {
  children: React.ReactNode;
  onClick: () => void;
}

const defaultProps: ButtonDefaultProps = {
  textSize: 'base',
};

function Button({ children, textSize, onClick }: ButtonProps) {
  return (
    <button
      className={cx(
        `flex items-center justify-center gap-4 rounded-sm bg-primary-green px-6 py-2 text-white hover:bg-green-700 text-${textSize}`
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;

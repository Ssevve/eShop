import { ThreeDots } from 'react-loader-spinner';
import theme from 'lib/theme';

function Loader() {
  return (
    <div className="mx-auto flex w-full grow flex-col items-center justify-center">
      <ThreeDots ariaLabel="Loading" height={48} width={60} color={theme.colors['primary']} />
    </div>
  );
}

export default Loader;

import { ThreeDots } from 'react-loader-spinner';
import theme from 'lib/theme';

function Loader() {
  return (
    <div className="mx-auto">
      <ThreeDots ariaLabel="Loading" height={48} width={60} color={theme.colors['primary']} />
    </div>
  );
}

export default Loader;
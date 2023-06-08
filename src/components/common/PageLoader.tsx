import { ThreeDots } from 'react-loader-spinner';
import theme from 'lib/theme';

function PageLoader() {
  return (
    <div className="mx-auto">
      <ThreeDots
        ariaLabel="Loading"
        height={48}
        width={60}
        color={theme.theme.colors['primary-green']}
      />
    </div>
  );
}

export default PageLoader;

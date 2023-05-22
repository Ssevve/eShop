import { ThreeDots } from 'react-loader-spinner';
import theme from 'theme';

function PageLoader() {
  return (
    <div className="mx-auto">
      <ThreeDots
        height={48}
        width={60}
        color={theme.theme.colors['primary-green']}
      />
    </div>
  );
}

export default PageLoader;

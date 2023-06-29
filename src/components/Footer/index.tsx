import Logo from '../common/Logo/Logo';
import SocialLinks from 'components/common/SocialLinks';

function Footer() {
  return (
    <footer className="rounded-lg border-t bg-white">
      <div className="mx-auto w-full max-w-screen-2xl p-3">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Logo />
        </div>
        <div className="mt-6 border-t border-gray-200 pt-6 xs:flex xs:flex-row xs:items-center xs:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2023 eShop. All Rights Reserved.
          </span>
          <SocialLinks className="mt-3 md:mt-0" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

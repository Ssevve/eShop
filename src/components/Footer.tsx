import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoTwitter } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Logo from './common/Logo/Logo';

function Footer() {
  return (
    <footer className="rounded-lg border-t bg-white">
      <div className="max-w-screen-xl mx-auto w-full p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Logo />
        </div>
        <div className="mt-6 border-t border-gray-200 pt-6 xs:flex xs:flex-row xs:items-center xs:justify-between">
          <span className="sm:text-center text-sm text-gray-500">
            © 2023 eShop. All Rights Reserved.
          </span>
          <div className="mt-4 flex space-x-6 xs:mt-0 xs:justify-center">
            <Link to="#" className="text-gray-500 hover:text-primary">
              <BiLogoFacebookCircle size={20} />
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link to="#" className="text-gray-500 hover:text-primary">
              <BiLogoInstagram size={20} />
              <span className="sr-only">Instagram page</span>
            </Link>
            <Link to="#" className="text-gray-500 hover:text-primary">
              <BiLogoTwitter size={20} />
              <span className="sr-only">Twitter page</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

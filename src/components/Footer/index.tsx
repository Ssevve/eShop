import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoTwitter } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo/Logo';

function Footer() {
  return (
    <footer className="rounded-lg border-t bg-white">
      <div className="mx-auto w-full max-w-screen-2xl p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Logo />
        </div>
        <div className="mt-6 border-t border-gray-200 pt-6 xs:flex xs:flex-row xs:items-center xs:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2023 eShop. All Rights Reserved.
          </span>
          <ul className="mt-4 flex space-x-6 xs:mt-0 xs:justify-center">
            <li>
              <Link aria-label="Facebook page" to="#" className="text-gray-500 hover:text-primary">
                <BiLogoFacebookCircle size={20} />
              </Link>
            </li>
            <li>
              <Link aria-label="Instagram page" to="#" className="text-gray-500 hover:text-primary">
                <BiLogoInstagram size={20} />
              </Link>
            </li>
            <li>
              <Link aria-label="Twitter page" to="#" className="text-gray-500 hover:text-primary">
                <BiLogoTwitter size={20} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

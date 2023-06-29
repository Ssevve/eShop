import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoTwitter } from 'react-icons/bi';
import { Link } from 'react-router-dom';

interface SocialLinksProps {
  className?: string;
}

function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={`flex space-x-6 xs:mt-0 xs:justify-center ${className}`}>
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
  );
}

export default SocialLinks;

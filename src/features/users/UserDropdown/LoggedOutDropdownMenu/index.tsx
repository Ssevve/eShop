import Button from 'components/common/Button';
import { Link } from 'react-router-dom';

interface LoggedOutDropdownMenuProps {
  toggleMenu: (bool: boolean) => void;
}

function LoggedOutDropdownMenu({ toggleMenu }: LoggedOutDropdownMenuProps) {
  return (
    <ul className="p-3">
      <li>
        <Button renderAs={Link} onClick={() => toggleMenu(false)} to="/login" fullWidth>
          Log in
        </Button>
      </li>
      <li>
        <span className="block py-3 text-center text-gray-400 before:absolute before:left-4 before:top-1/2 before:h-px before:w-5 before:-translate-y-1/2 before:bg-gray-400 after:absolute after:right-4 after:top-1/2 after:h-px after:w-5 after:-translate-y-1/2 after:bg-gray-400">
          No account?
        </span>
      </li>
      <li>
        <Button
          renderAs={Link}
          variant="primary-outline"
          onClick={() => toggleMenu(false)}
          to="/register"
          fullWidth
        >
          Register
        </Button>
      </li>
    </ul>
  );
}

export default LoggedOutDropdownMenu;

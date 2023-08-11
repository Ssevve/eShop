import { NavLink } from 'react-router-dom';
import { Tab as TabType } from './types';

interface TabProps {
  tab: TabType;
}

export function Tab({ tab }: TabProps) {
  console.log(location.pathname);
  return (
    <li className="mr-1.5">
      <NavLink
        end
        to={tab.default ? window.location.pathname : `${tab.path}`}
        className={({ isActive }) =>
          `inline-block border-b-2 p-3 hover:border-gray-300 hover:text-gray-600 ${
            isActive ? 'border-primary text-primary' : 'border-transparent'
          }`
        }
      >
        {tab.label}
      </NavLink>
    </li>
  );
}

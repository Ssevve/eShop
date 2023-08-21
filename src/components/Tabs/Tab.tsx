import { NavLink } from 'react-router-dom';
import { Tab as TabType } from './types';

interface TabProps {
  tab: TabType;
}

export function Tab({ tab }: TabProps) {
  const path = tab.default ? `/${window.location.pathname.split('/')[1]}` : tab.path;
  return (
    <li className="mr-1.5">
      <NavLink
        end
        to={path}
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

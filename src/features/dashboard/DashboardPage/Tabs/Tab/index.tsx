import TabType from '@/types/Tab';
import { NavLink } from 'react-router-dom';

interface TabProps {
  tab: TabType;
}

function Tab({ tab }: TabProps) {
  return (
    <li className="mr-1.5">
      <NavLink
        end
        to={tab.default ? '.' : `./${tab.path}`}
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

export default Tab;

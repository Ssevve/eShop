import { NavLink } from 'react-router-dom';
import TabType from 'types/Tab';

interface TabsProps {
  tabs: TabType[];
}

function Tabs({ tabs }: TabsProps) {
  return (
    <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500">
      <ul className="-mb-px flex">
        {tabs.map((tab) => (
          <Tab isActive={location.pathname === tab.path} tab={tab} />
        ))}
      </ul>
    </div>
  );
}

interface TabProps {
  isActive: boolean;
  tab: TabType;
}

function Tab({ tab }: TabProps) {
  return (
    <li className="mr-1.5">
      <NavLink
        to={`.${tab.path}`}
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

export default Tabs;

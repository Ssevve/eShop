import TabType from '@/types/Tab';
import Tab from './Tab';

interface TabsProps {
  tabs: TabType[];
}

function Tabs({ tabs }: TabsProps) {
  return (
    <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500">
      <ul className="-mb-px flex">
        {tabs.map((tab) => (
          <Tab key={tab.id} tab={tab} />
        ))}
      </ul>
    </div>
  );
}

export default Tabs;

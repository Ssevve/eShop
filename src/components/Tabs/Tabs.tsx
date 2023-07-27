import { Tab } from './Tab';
import { Tab as TabType } from './types';

interface TabsProps {
  tabs: TabType[];
}

export function Tabs({ tabs }: TabsProps) {
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

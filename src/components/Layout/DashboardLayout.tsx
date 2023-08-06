import { Tab, Tabs } from '@/components/Tabs';
import { Outlet } from 'react-router-dom';

export function DashboardLayout() {
  const tabs: Tab[] = [
    {
      id: 0,
      label: 'My profile',
      default: true,
    },
    {
      id: 1,
      label: 'My reviews',
      path: `reviews`,
    },
  ];

  return (
    <section className="mx-auto w-full py-8">
      <header className="w-full">
        <Tabs tabs={tabs} />
      </header>
      <section className="py-12">
        <Outlet />
      </section>
    </section>
  );
}

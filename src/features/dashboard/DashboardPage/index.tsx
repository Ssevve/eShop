import { Outlet } from 'react-router-dom';
import Tab from 'types/Tab';
import Tabs from 'components/common/Tabs';

function DashboardPage() {
  const tabs: Tab[] = [
    {
      id: 0,
      label: 'My profile',
      path: `/`,
    },
    {
      id: 1,
      label: 'My reviews',
      path: `/reviews`,
    },
  ];

  return (
    <section className="mx-auto w-full">
      <header className="w-full">
        <Tabs tabs={tabs} />
      </header>
      <section className="py-12">
        <Outlet />
      </section>
    </section>
  );
}

export default DashboardPage;

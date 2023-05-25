import HomeLink from 'components/common/HomeLink';

function NotFound() {
  return (
    <section className="my-auto flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl">Not Found</h1>
      <HomeLink />
    </section>
  );
}

export default NotFound;

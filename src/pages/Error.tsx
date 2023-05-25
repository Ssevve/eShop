import HomeLink from 'components/common/HomeLink';

function Error() {
  return (
    <section className="my-auto flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Error!</h1>
      <p className="m-auto text-lg ">Could not get data from the server. Please try again later.</p>
      <HomeLink />
    </section>
  );
}

export default Error;

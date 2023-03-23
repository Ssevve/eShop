import { Link } from 'react-router-dom';

import Logo from 'components/common/Logo';

function Login() {
  const login = () => {};
  return (
    <div className="flex h-full items-center p-6">
      <form className="mx-auto flex w-96 min-w-max flex-col gap-4 rounded-sm bg-white p-6 drop-shadow-md">
        <header className="flex items-center justify-center">
          <Logo />
        </header>
        <label className="grid">
          Email
          <input
            className="w-0 min-w-full rounded-sm border border-black p-2"
            type="text"
          />
        </label>
        <label className="grid">
          Password
          <input
            className="w-0 min-w-full rounded-sm border border-black p-2"
            type="password"
          />
        </label>
        <button
          className="rounded-sm border border-green-600 bg-green-600 p-2 font-bold text-white transition duration-75 ease-out hover:border-green-500 hover:bg-green-500 hover:ease-in"
          type="submit"
        >
          Log in
        </button>
        <footer>
          <p className="text-md mt-4 flex justify-center gap-2 text-sm">
            Need an account?
            <Link className="text-green-600 hover:underline" to="/register">
              Register
            </Link>
          </p>
        </footer>
      </form>
    </div>
  );
}

export default Login;

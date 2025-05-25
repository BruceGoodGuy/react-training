import { Link } from "react-router-dom";
import { useActionState, useEffect } from "react";
import { doLogin } from "./LoginAction";
import { Alert } from "flowbite-react";
import { MdError } from "react-icons/md";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

const initialState = {
  values: { email: "", password: "" },
  errors: {},
  isValid: false,
};
const Login = () => {
  const navigate = useNavigate();
  const [state, formAction, isPending] = useActionState(doLogin, initialState);

  useEffect(() => {
    if (state.isValid) {
      const redirectTo = new URLSearchParams(window.location.search).get(
        "redirectTo"
      );
      const navigateTo = redirectTo ? redirectTo : "/pages";
      navigate(navigateTo);
    }
  }, [state.isValid, navigate]);

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
      <a
        href="#"
        className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
      >
        <img src="/logo.png" className="mr-4 h-11" alt="Simple KYC Logo" />
        <span>Simple KYC Authentication</span>
      </a>
      <div className="w-full max-w-xl relative p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sign in to platform
        </h2>
        <form className="mt-8 space-y-6" action={formAction} noValidate>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="name@company.com"
              defaultValue={state.values.email}
              required
            />
            {state.errors?.email && (
              <Alert color="failure" icon={MdError} className="mt-2">
                {state.errors.email}
              </Alert>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
            />
            {state.errors?.password && (
              <Alert color="failure" icon={MdError} className="mt-2">
                {state.errors.password}
              </Alert>
            )}
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                name="remember"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="font-medium text-gray-900 dark:text-white"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/pages/auth/reset-password"
              className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
            >
              Lost Password?
            </Link>
          </div>
          <button
            type="submit"
            className="border border-gray-300 w-full px-5 py-3 text-base font-medium border-gray-300 text-center dark:text-white dark:bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Forgot password?{" "}
            <Link
              to="/auth/sign-up"
              className="text-primary-700 hover:underline dark:text-primary-500"
            >
              Sign-up
            </Link>
          </div>
          {state.errors?.unexpected && (
            <Alert color="failure" icon={MdError} className="mt-2">
              {state.errors.unexpected}
            </Alert>
          )}
        </form>
        <Loading isLoading={isPending} />
      </div>
    </div>
  );
};

export default Login;

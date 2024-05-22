import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="container max-w-4xl mx-auto text-center px-10 py-10 my-40 border border-gray-200 ">
      <h1 className="text-3xl p-6">Page not Found</h1>
      <NavLink
        to="/"
        className="text-xl font-semibold text-primary hover:underline"
      >
        Back to the index page
      </NavLink>
    </div>
  );
};

export default ErrorPage;

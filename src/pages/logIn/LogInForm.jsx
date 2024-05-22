import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLogin } from "../../api/auth/login.jsx";
import LoadingIndicator from "../../components/ui/LoadingInd.jsx";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email address"),
  password: Yup.string().required("Please enter your password"),
});

const LogInForm = () => {
  const { logIn } = useLogin();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setErrorMessage(null);
        setIsLoading(true);
        await logIn(values);
        navigate("/profile");
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center bg-white shadow-md rounded-sm px-6 py-12 lg:px-8">
      {isLoading && <LoadingIndicator />}
      <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">
        Log In
      </h2>
      <form
        className="mt-10 mx-auto w-full max-w-sm space-y-6"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            required
            className="mt-2 w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-indigo-600"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            required
            className="mt-2 w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-indigo-600"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-lighter"
        >
          {formik.isSubmitting ? "Logging In..." : "Log In"}
        </button>
      </form>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <NavLink to="/signup" className="font-bold text-primary">
          Sign up
        </NavLink>
      </p>
    </div>
  );
};

export default LogInForm;

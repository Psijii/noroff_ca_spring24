import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "../../api/auth/signup.mjs";
import LoadingIndicator from "../../components/ui/LoadingInd.jsx";

const emailNoroffRegex = /^[A-Z0-9._%+-]+@stud.noroff\.no$/i;

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "your name should be at least 3 character")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .matches(emailNoroffRegex, "name@stud.noroff.no")
    .required(
      "Please enter your noroff email address (e,g- name@stud.noroff.no)"
    ),
  password: Yup.string().required("Required"),
  avatar: Yup.string().url("Invalid URL"),
  venueManager: Yup.boolean(),
});

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
      venueManager: false,
    },

    onSubmit: async (values, action) => {
      const formData = {
        name: values.name,
        email: values.email,
        password: values.password,
        avatar: values.avatar,
        venueManager: values.venueManager,
      };

      try {
        setIsLoading(true);
        const response = await signUp(formData);

        if (response) {
          toast.success(
            "Registration successful! You will be redirected to the sign-in page."
          ),
            {
              className: "toast-success",
              autoClose: 2000,
            };
          action.resetForm();
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          throw new Error("Registration failed.");
        }
      } catch (error) {
        toast.error("Registration failed!", {
          className: "toast-error",
          autoClose: 2000,
        });
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },

    validationSchema,
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8 bg-white shadow-md rounded-sm overflow-hidden mx-auto max-w-xl mt-10">
        {isLoading && <LoadingIndicator />}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={formik.handleSubmit}
            method="POST"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-sm border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-sm border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="block w-full rounded-sm border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Avatar
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-sm border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="avatar"
                  name="avatar"
                  type="avatar"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.avatar}
                />
                {formik.touched.avatar && formik.errors.avatar ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.avatar}
                  </div>
                ) : null}
              </div>
            </div>

            <p>How do you like to register?</p>
            <fieldset className="flex flex-col gap-4 md:flex-row md:gap-12">
              <p>Do you want to rent out an accommodation?</p>
              <div>
                <input
                  onChange={() => {
                    formik.setFieldValue("venueManager", true);
                  }}
                  type="radio"
                  id="yes"
                  name="venueManager"
                />
                <label htmlFor="yes" className="ml-1">
                  Yes
                </label>
              </div>
              <div>
                <input
                  onChange={() => {
                    formik.setFieldValue("venueManager", false);
                  }}
                  type="radio"
                  id="no"
                  name="venueManager"
                />
                <label htmlFor="no" className="ml-1">
                  No
                </label>
              </div>
            </fieldset>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-sm bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-lighter focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
          <ToastContainer />
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account ?{" "}
            <NavLink to="/login" className="font-bold text-primary">
              {" "}
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;

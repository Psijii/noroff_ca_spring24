import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { createVenue } from "./createVenue";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVenues } from "../../../context/useVenues";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  description: Yup.string()
    .min(6, "Description must be at least 6 characters")
    .max(500, "Description must be at most 500 characters")
    .required("Description is required"),
  price: Yup.number()
    .min(0, "Must be + characters or more!")
    .positive("Price must be positive")
    .required("Required"),
  maxGuests: Yup.number()
    .min(0, "Must be + characters or more!")
    .positive("Must be positive")
    .required("Required"),
  media: Yup.array().of(Yup.string().url("Invalid URL")),

  meta: Yup.object().shape({
    wifi: Yup.boolean(),
    parking: Yup.boolean(),
    breakfast: Yup.boolean(),
    pets: Yup.boolean(),
  }),
  location: Yup.object().shape({
    address: Yup.string()
      .min(4, "Must be four (4) characters or more.")
      .max(60, "Cannot be longer than sixty (60) characters")
      .required("Required"),
    city: Yup.string()
      .min(4, "Must be four (4) characters or more.")
      .max(60, "Cannot be longer than sixty (60) characters")
      .required("Required"),
    zip: Yup.string()
      .min(4, "Must be four (4) characters or more.")
      .max(40, "Cannot be longer than forty (40) characters")
      .required("Required"),
    country: Yup.string()
      .min(4, "Must be four (4) characters or more.")
      .max(40, "Cannot be longer than forty(40) characters")
      .required("Required"),
      continent: Yup.string()
      .min(4, "Must be four (4) characters or more.")
      .max(40, "Cannot be longer than forty (40) characters")
      .required("Required"),
  }),
});

const CreateVenueForm = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const { addVenue } = useVenues();

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      media: [],
      price: 1,
      maxGuests: 1,
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
      },
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
    },

    onSubmit: async (values, action) => {
      const formData = {
        name: values.name,
        description: values.description,
        price: values.price,
        maxGuests: values.maxGuests,
        media: mediaArray,

        location: {
          address: values.location.address,
          city: values.location.city,
          zip: values.location.zip,
          country: values.location.country,
          continent: values.location.continent,
        },
        meta: {
          wifi: values.meta.wifi,
          parking: values.meta.parking,
          breakfast: values.meta.breakfast,
          pets: values.meta.pets,
        },
      };
      try {
        const response = await createVenue(formData);

        if (response) {
          toast.success("Venue successfully created.", {
            position: "bottom-center",
            autoClose: 5000,
          });

          addVenue(response);

          setTimeout(() => {
            window.location.reload();
          }, 2000);
          action.resetForm();
        } else {
          throw new Error("Creating venue failed");
        }
      } catch (error) {
        toast.error("Creating new venue failed. Please try again later.", {
          position: "bottom-center",
          autoClose: 2000,
        });
      }
    },
    validationSchema,
  });

  const pushMedia = () => {
    setMediaArray([...mediaArray, ""]);
  };

  const handleMediaChange = (e, index) => {
    const updatedMediaUrls = [...mediaArray];
    updatedMediaUrls[index] = e.target.value;
    setMediaArray(updatedMediaUrls);
  };
  const removeMedia = (index) => {
    const updatedMediaUrls = [...mediaArray];
    updatedMediaUrls.splice(index, 1);
    setMediaArray(updatedMediaUrls);
  };

  return (
    <>
      <div className="container max-w-2xl mx-auto mt-20 px-20 py-20 shadow-sm">
        <h1 className="text-2xl text-center mb-20 border-b-4 border-secondary py-2 rounded-sm">
          Create your accommodation
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {touched.name && errors.name ? (
                <div className="text-red-500 text-sm">{errors.name}</div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Price
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-sm border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="price"
                name="price"
                type="number"
                autoComplete="off"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
              />
              {touched.price && errors.price ? (
                <div className="text-red-500 text-sm">{errors.price}</div>
              ) : null}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
            </div>
            <div className="mt-2">
              <textarea
                className="block w-full rounded-sm border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="description"
                name="description"
                type="text"
                autoComplete="off"
                required
                rows="3"
                onChange={handleChange}
                value={values.description}
                onBlur={handleBlur}
              />
              {touched.description && errors.description ? (
                <div className="text-red-500 text-sm">{errors.description}</div>
              ) : null}
            </div>
          </div>
          <div>
            {/* location */}
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Address
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-sm border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="address"
                name="location.address"
                type="text"
                autoComplete="off"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location.address}
              />
              {touched.location?.address && errors.location?.address ? (
                <div className="text-red-500">
                  <p>{errors.location.address}</p>
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-sm border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="city"
                name="location.city"
                type="text"
                autoComplete="off"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location.city}
              />
              {touched.location?.city && errors.location?.city ? (
                <div className="text-red-500 text-sm">
                  {errors.location.city}
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="zip"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Zip-code
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-sm border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="zip"
                name="location.zip"
                type="text"
                autoComplete="off"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location.zip}
              />
              {touched.location?.zip && errors.location?.zip ? (
                <div className="text-red-500 text-sm">
                  {errors.location.zip}
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Country
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-sm border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="country"
                name="location.country"
                type="text"
                autoComplete="off"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location.country}
              />
              {touched.location?.country && errors.location?.country ? (
                <div className="text-red-500 text-sm">
                  {errors.location.country}
                </div>
              ) : null}
            </div>
          </div>
         
          
                  
          <div>
            <label
              htmlFor="maxGuests"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Maximum number of guests
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-sm border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="maxGuests"
                name="maxGuests"
                type="number"
                autoComplete="off"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.maxGuests}
              />
              {touched.maxGuests && errors.maxGuests ? (
                <div className="text-red-500 text-sm">{errors.maxGuests}</div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="continent"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Continent
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="continent"
                name="location.continent"
                type="text"
                autoComplete="off"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location.continent}
              />
              {touched.location?.continent && errors.location?.continent ? (
                <div className="text-red-500 text-sm">
                  {errors.location.continent}
                </div>
              ) : null}
            </div>
          </div>
          {/* media start */}
          <div className="py-3 ">
            <div>
              <div className="py-3 flex flex-col justify-center flex-wrap text-primary">
                <label
                  htmlFor="media"
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                >
                  Add media
                </label>

                {mediaArray.map((media, index) => (
                  <div key={index}>
                    <input
                      type="url"
                      name={`media-${index}`}
                      className="text-white px-3 py-2 bg-primary border-b-1 border-slate-300 focus:outline-none focus:border-blue focus:ring-orange block w-full rounded-sm sm:text-sm focus:ring-1"
                      placeholder="Image URL"
                      value={media}
                      onChange={(e) => handleMediaChange(e, index)}
                    />
                    {media && (
                      <div className="relative h-24 w-24 rounded-sm">
                        <img
                          src={media}
                          alt={`Uploaded image ${index}`}
                          className=" flex gap-1 w-28 h-30 rounded object-cover"
                        />
                        <button
                          className="absolute bottom-0 right-0 z-10 rounded-sm bg-red-700 p-1 text-xs text-white"
                          onClick={() => removeMedia(index)}
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    {/* media ends */}
                  </div>
                ))}
                <div className="flex gap-3 my-4">
                  <button
                    type="button"
                    onClick={pushMedia}
                    className="bg-tertiary px-4 py-2 rounded hover:bg-tertiary-darker shadow-md text-white"
                  >
                    Add media
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* media end */}

          <div>
            {/* meta data start */}
            <div className="mt-6">
              <h3 className="mb-4 font-semibold text-gray-900">
                Add facilities
              </h3>
              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-sm sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="wifi"
                      name="meta.wifi"
                      type="checkbox"
                      onBlur={handleBlur}
                      checked={values.meta.wifi}
                      onChange={() => {
                        setFieldValue("meta.wifi", !values.meta.wifi);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="wifi"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Wi-fi
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="parking"
                      name="meta.parking"
                      type="checkbox"
                      onBlur={handleBlur}
                      checked={values.meta.parking}
                      onChange={() => {
                        setFieldValue("meta.parking", !values.meta.parking);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="react-checkbox-list"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Parking
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="breakfast"
                      name="meta.breakfast"
                      type="checkbox"
                      onBlur={handleBlur}
                      checked={values.meta.breakfast}
                      onChange={() => {
                        setFieldValue("meta.breakfast", !values.meta.breakfast);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="angular-checkbox-list"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Breakfast
                    </label>
                  </div>
                </li>
                <li className="w-full dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="pets"
                      name="meta.pets"
                      type="checkbox"
                      onBlur={handleBlur}
                      checked={values.meta.pets}
                      onChange={() => {
                        setFieldValue("meta.pets", !values.meta.pets);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="laravel-checkbox-list"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Pets
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            {/* meta data end */}

            <button
              type="submit"
              className=" mt-4 flex w-full justify-center rounded-sm bg-primary px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-primary-darker focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create venue
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default CreateVenueForm;

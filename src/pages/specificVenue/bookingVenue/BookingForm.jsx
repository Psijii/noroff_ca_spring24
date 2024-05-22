import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createBooking } from "./createBookingApiCall";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSpecificVenue from "../../../hooks/useSpecificVenue";

import { format, addDays, isBefore } from "date-fns";

//eslint-disable-next-line
const BookingForm = ({ price, maxGuests }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const { specificVenue } = useSpecificVenue(id);

  const initialValues = {
    dateFrom: null,
    dateTo: null,
    guests: 0,
    venueId: id,
  };

  const bookingDates = specificVenue?.bookings?.flatMap((booking) => {
    const dateFrom = new Date(booking.dateFrom);
    let currentDate = dateFrom;
    const dateTo = new Date(booking.dateTo);

    const dates = [];

    while (
      isBefore(currentDate, dateTo) ||
      currentDate.getTime() === dateTo.getTime()
    ) {
      const formattedDate = format(currentDate, "dd MMMM yyyy");

      dates.push(new Date(formattedDate));
      currentDate = addDays(currentDate, 1);
    }

    return dates;
  });

  const disabledDates = bookingDates || [];

  const handleSubmit = async (values) => {
    const bookingFormData = {
      dateFrom: values.dateFrom,
      dateTo: values.dateTo,
      guests: values.guests,
      venueId: values.venueId,
    };

    try {
      const response = await createBooking(bookingFormData);

      if (response) {
        toast.success("Booking successful!", {
          position: "bottom-center",
          autoClose: 1000,
        });

        setTimeout(() => {
          navigate("/profile");
        }, 2000);

        const start = new Date(values.dateFrom);
        const end = new Date(values.dateTo);
        const timeDiff = Math.abs(end - start);
        const numberOfNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        const totalPrice = price * numberOfNights;
        setTotalAmount(totalPrice);
        formik.resetForm();
      } else {
        throw new Error("Booking failed");
      }
    } catch (error) {
      toast.error("Booking failed. Please try again later.", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  };

  const validationSchema = Yup.object().shape({
    dateFrom: Yup.date().required("Start date is required"),
    dateTo: Yup.date()
      .required("End date is required")
      .min(Yup.ref("dateFrom"), "End date must be after start date"),
    guests: Yup.number()
      .required("Number of guest(s) is required")
      .min(1, "Number of guest(s) must be at least one (1).")
      .max(maxGuests, `Max number of guests is ${maxGuests}`),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleDatesSelected = ({ startDate, endDate }) => {
    formik.setFieldValue("dateFrom", startDate);
    formik.setFieldValue("dateTo", endDate);

    if (startDate && endDate) {
      const daysDifference = Math.ceil(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
      );

      setTotalDays(daysDifference);

      const newTotalAmount = daysDifference * price;
      setTotalAmount(newTotalAmount);
    }
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-sm mx-auto mt-10 p-4 bg-white rounded-sm shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="dateFrom"
            className="block text-gray-700 font-bold mb-2"
          >
            Start date
          </label>
          <DatePicker
            selected={formik.values.dateFrom}
            onChange={(date) => {
              formik.setFieldValue("dateFrom", date);
              handleDatesSelected({
                startDate: date,
                endDate: formik.values.dateTo,
              });
            }}
            dateFormat="dd/MM/yyyy"
            placeholderText="Start date"
            minDate={new Date()}
            isClearable={true}
            className="border border-red-800 px-4 py-2 rounded w-full"
            excludeDates={disabledDates}
          />
          {formik.errors.dateFrom && formik.touched.dateFrom && (
            <div className="text-red-500 mt-2">{formik.errors.dateFrom}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="dateTo"
            className="block text-gray-700 font-bold mb-2"
          >
            End date
          </label>
          <DatePicker
            selected={formik.values.dateTo}
            onChange={(date) => {
              formik.setFieldValue("dateTo", date);
              handleDatesSelected({
                startDate: formik.values.dateFrom,
                endDate: date,
              });
            }}
            dateFormat="dd/MM/yyyy"
            placeholderText="End date"
            minDate={new Date()}
            isClearable={true}
            className="border border-red-800 px-4 py-2 rounded-sm w-full"
            excludeDates={disabledDates}
          />
          {formik.errors.dateTo && formik.touched.dateTo && (
            <div className="text-red-500 mt-2">{formik.errors.dateTo}</div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="guests"
            className="block text-gray-700 font-bold mb-2"
          >
            Number of guest(s)
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={formik.values.guests}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-red-800 px-4 py-2 rounded-sm w-full"
          />
          {formik.errors.guests && formik.touched.guests && (
            <div className="text-red-500 mt-2">{formik.errors.guests}</div>
          )}
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-bold">Total days: {totalDays}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-bold">
            Total amount: ${totalAmount}
          </p>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-primary text-white font-bold font-heading py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline hover:bg-primary-lighter"
          >
            Book now
          </button>
        </div>
        <ToastContainer />
      </form>
    </>
  );
};

export default BookingForm;

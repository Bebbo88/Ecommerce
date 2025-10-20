import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import { BounceLoader } from "react-spinners";
import * as Yup from "yup";

export default function OrderShipped() {
  const egyptMobileRegex = /^01[0125][0-9]{8}$/;

  const [isLoading, setIsLoading] = useState(false);
  let { onlinePayment } = useContext(OrderContext);

  const validationSchema = Yup.object({
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        egyptMobileRegex,
        "Enter a valid Egyptian phone number (e.g., 01012345678)"
      ),

    city: Yup.string()
      .trim()
      .required("City is required")
      .min(2, "City name is too short")
      .max(60, "City name is too long"),

    details: Yup.string()
      .trim()
      .required("Delivery details are required")
      .min(
        10,
        "Please provide more detailed delivery info (at least 10 characters)"
      )
      .max(1000, "Details are too long"),
  });
  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await onlinePayment(
        localStorage.getItem("cartId"),
        values
      );

      if (data?.status == "success") {
        window.location.href = data.session?.url;
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  if (isLoading)
    return (
      <div
        className="loading d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <BounceLoader color="#7534b7" size={120} />
      </div>
    );
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="">Full Name:</label>
      <input className="form-control mt-1 mb-3" type="text" />
      <label htmlFor="">Phone Number:</label>
      <input
        className="form-control mt-1 mb-3"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.phone}
        type="tel"
        name="phone"
        id="phone"
      />
      {formik.errors.phone && formik.touched.phone ? (
        <div className="alert alert-danger">{formik.errors.phone}</div>
      ) : (
        ""
      )}

      <label htmlFor="">City:</label>
      <input
        className="form-control mt-1 mb-3"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.city}
        type="text"
        name="city"
        id="city"
      />
      {formik.errors.city && formik.touched.city ? (
        <div className="alert alert-danger">{formik.errors.city}</div>
      ) : (
        ""
      )}
      <label htmlFor="">Details:</label>
      <textarea
        style={{ height: 200 }}
        className="form-control mt-1 mb-3"
        placeholder="Enter more Details for the Delivry"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.details}
        name="details"
        id="details"
      />
      {formik.errors.details && formik.touched.details ? (
        <div className="alert alert-danger">{formik.errors.details}</div>
      ) : (
        ""
      )}
      <button
        disabled={!formik.isValid || !formik.dirty}
        type="submit"
        className="btn bg-main text-white"
      >
        Proceed To Pay
      </button>
    </form>
  );
}

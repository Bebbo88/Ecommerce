import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import * as Yup from "yup";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let phoneRegx = /^01[0-2,5][0-9]{8}$/;
  let passRegx = /^[A-Za-z0-9]{8,16}$/;
  const navigate = useNavigate();
  async function regiterSubmit(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (data.message == "success") {
        setIsLoading(false);
        navigate("/login");
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.message);
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "name must contain only letters")
      .min(3, "name must be at least 3 chars")
      .max(12, "name must be less than 12 chars")
      .required("name is required"),

    email: Yup.string().email("invalid email").required("email is required"),
    phone: Yup.string()
      .matches(phoneRegx, "invalid phone number")
      .required("phone number is required"),
    password: Yup.string()
      .matches(passRegx, "password is weak")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password dosn't match")
      .required("repassword is required"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,

    onSubmit: regiterSubmit,
  });

  if (isLoading)
    return (
      <div className="loading" style={{ height: "100vh" }}>
        <BounceLoader color="#7534b7" size={120} />
      </div>
    );
  return (
    <>
      <div className="row">
        <div className="col-md-6 mt-3">
          <img
            className="w-100"
            src="/Assets/images/Side Image.png"
            alt="Register Image"
          />
        </div>
        <div className="col-md-6" style={{ position: "relative" }}>
          <div className="m-auto w-75 mt-5">
            {error && <div className="alert alert-danger p-2">{error}</div>}
            <h1 className="mb-3">Register Now!</h1>
            <form action="" onSubmit={formik.handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                name="name"
                id="name"
                className="form-control mb-3 mt-2"
                placeholder="Enter your name"
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="alert alert-danger mt-2 p-1">
                  {formik.errors.name}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="name">Email</label>
              <input
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                name="email"
                id="email"
                className="form-control mb-3 mt-2"
                placeholder="Enter your email"
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="alert alert-danger mt-2 p-1">
                  {formik.errors.email}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="name">Phone</label>
              <input
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="tel"
                name="phone"
                id="phone"
                className="form-control mb-3 mt-2"
                placeholder="Enter your phone number"
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="alert alert-danger mt-2 p-1">
                  {formik.errors.phone}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="name">Password</label>
              <input
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                name="password"
                id="password"
                className="form-control mb-3 mt-2"
                placeholder="Enter your password"
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="alert alert-danger mt-2 p-1">
                  {formik.errors.password}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="name">Confirm Password</label>
              <input
                value={formik.values.rePassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                name="rePassword"
                id="rePassword"
                className="form-control mb-3 mt-2"
                placeholder="Enter your password again"
              />
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <div className="alert alert-danger mt-2 p-1">
                  {formik.errors.rePassword}
                </div>
              ) : (
                ""
              )}

              {isLoading ? (
                <button className="btn bg-main text-white my-3">
                  <i className=" fa fa-spinner fa-spin"></i>
                </button>
              ) : (
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn bg-main text-white my-3"
                >
                  Register
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ForgetPasswordContext } from "../context/ForgetPasswordContext";
import toast from "react-hot-toast";
import Login from "../pages/Login";
import * as Yup from "yup";
import { BounceLoader } from "react-spinners";

export default function SetNewPassword() {
  let passRegx = /^[A-Za-z0-9]{8,16}$/;

  const [isLoading, setIsLoading] = useState(false);
  const { updatePassword, setStep } = useContext(ForgetPasswordContext);

  async function handleSubmit(values) {
    setIsLoading(true);

    try {
      let { data } = await updatePassword(values);
      console.log(data);
      if (data?.token) {
        toast.success("Password updated successfully");
        setStep("login");
      } else {
        toast.error("Somthing Went Wrong");
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().email("invalid email").required("email is required"),

    newPassword: Yup.string()
      .matches(passRegx, "password is weak")
      .required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  if (isLoading)
    return (
      <div className="loading" style={{ height: "100vh" }}>
        <BounceLoader color="#7534b7" size={120} />
      </div>
    );
  return (
    <>
      <div className="col-md-6" style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "20%",
          }}
          className="m-auto w-75 mt-5"
        >
          <form onSubmit={formik.handleSubmit}>
            <label className="mb-1" htmlFor="">
              Enter your email
            </label>
            <input
              className="form-control"
              placeholder="put your email"
              type="text"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="alert alert-danger mt-1 p-1 ">
                {formik.errors.email}
              </div>
            )}

            <label className="mb-1 mt-3" htmlFor="">
              Enter New Password
            </label>
            <input
              className="form-control"
              placeholder="Enter new password "
              type="password"
              name="newPassword"
              id="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <div className="alert alert-danger mt-1 p-1">
                {formik.errors.newPassword}
              </div>
            )}

            <button type="submit" className="w-100 btn bg-main text-white mt-4">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ForgetPasswordContext } from "../context/ForgetPasswordContext";
import { BounceLoader } from "react-spinners";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const { forgotPassword, setStep } = useContext(ForgetPasswordContext);

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      let { data } = await forgotPassword(values);

      if (data?.statusMsg === "success") {
        toast.success(data?.message);
        setStep("code");
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Request failed");
    } finally {
      setIsLoading(false);
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().email("invalid email").required("email is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
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
            <h3 htmlFor="">Enter your email</h3>

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
              <alert className="text-danger">{formik.errors.email}</alert>
            )}

            <button type="submit" className="w-100 btn bg-main text-white mt-4">
              Send verification code
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

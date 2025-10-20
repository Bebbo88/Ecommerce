import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { BounceLoader } from "react-spinners";
import { UserContext } from "../context/UserContext";
import ForgotPassword from "/src/components/ForgotPassword.jsx";
import { ForgetPasswordContext } from "../context/ForgetPasswordContext";
import VerifyCode from "../components/VerifyCode";
import SetNewPassword from "../components/SetNewPassword";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUserToken } = useContext(UserContext);
  const { step, setStep } = useContext(ForgetPasswordContext);
  let { setToken } = useContext(AuthContext);
  let { getCartIdFromServer } = useContext(CartContext);

  let passRegx = /^[A-Za-z0-9]{8,16}$/;
  const navigate = useNavigate();

  async function loginSubmit(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data?.message == "success") {
        localStorage.setItem("UserToken", data?.token);
        await getCartIdFromServer(data?.token);
        setUserToken(data.token);
        setIsLoading(false);
        navigate("/");
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data.message);
    }
    setToken(localStorage.getItem("UserToken"));
  }

  let validationSchema = Yup.object({
    email: Yup.string().email("invalid email").required("email is required"),

    password: Yup.string()
      .matches(passRegx, "password is weak")
      .required("password is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",

      password: "",
    },
    validationSchema,

    onSubmit: loginSubmit,
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
          <img className="w-100" src="/Assets/images/Side Image.png" alt="" />
        </div>
        {step == "login" ? (
          <div className="col-md-6" style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: "20%",
                left: "20%",
              }}
              className="m-auto w-75 mt-5"
            >
              {error && <div className="alert alert-danger p-2">{error}</div>}
              <h1 className="mb-3">Login Now!</h1>
              <form action="" onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Email</label>
                <input
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form-control mt-2"
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="alert alert-danger mt-2 p-1">
                    {formik.errors.email}
                  </div>
                ) : (
                  ""
                )}

                <label className="mt-3" htmlFor="name">
                  Password
                </label>
                <input
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="form-control mt-2"
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="alert alert-danger mt-2 p-1">
                    {formik.errors.password}
                  </div>
                ) : (
                  ""
                )}
                <div className="d-flex justify-content-between align-items-center">
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
                      Login
                    </button>
                  )}
                  <Link
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                    }}
                    onClick={() => setStep("forget")}
                  >
                    Forgotten Password?
                  </Link>
                </div>
                {/* <Link to={"/register"}>Create New Account</Link> */}
              </form>
            </div>
          </div>
        ) : step == "forget" ? (
          <ForgotPassword />
        ) : step === "code" ? (
          <VerifyCode />
        ) : step === "new password" ? (
          <SetNewPassword />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

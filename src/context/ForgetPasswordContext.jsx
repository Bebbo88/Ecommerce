import axios from "axios";
import React, { createContext, useState } from "react";

export const ForgetPasswordContext = createContext();
export default function ForgetPasswordContextProvider(props) {
  const [step, setStep] = useState("login");

  function forgotPassword(values) {
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        email: values.email,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function verifyCode(resetCode) {
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        resetCode,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function updatePassword(values) {
    return axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        email: values.email,
        newPassword: values.newPassword,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  return (
    <>
      <ForgetPasswordContext.Provider
        value={{ forgotPassword, verifyCode, updatePassword, setStep, step }}
      >
        {props.children}
      </ForgetPasswordContext.Provider>
    </>
  );
}

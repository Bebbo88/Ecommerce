import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { BounceLoader } from "react-spinners";
import { ForgetPasswordContext } from "../context/ForgetPasswordContext";

export default function VerifyCode() {
  let { verifyCode, setStep } = useContext(ForgetPasswordContext);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [responseType, setResponseType] = useState("");

  async function handleSubmit(values) {
    setIsLoading(true);
    setResponseMsg("");
    try {
      let { data } = await verifyCode(values.resetCode);

      if (data?.status === "Success") {
        setResponseMsg("✅ Code verified successfully!");
        setResponseType("success");

        setTimeout(() => setStep("new password"), 1000);
      } else {
        setResponseMsg("❌ Invalid code, please try again.");
        setResponseType("error");
      }

      setIsLoading(false);
    } catch (err) {
      console.log("Error Response:", err.response?.data || err);
      setResponseMsg("❌ Invalid or expired code.");
      setResponseType("error");
      setIsLoading(false);
    }
  }
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
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
          {responseMsg && (
            <div
              className={`alert ${
                responseType === "success" ? "alert-success" : "alert-danger"
              } text-center`}
            >
              {responseMsg}
            </div>
          )}
          <form onSubmit={formik.handleSubmit}>
            <h3 className="h5" htmlFor="">
              Enter Code sent to your email
            </h3>

            <input
              className="form-control"
              placeholder="put your code"
              type="text"
              name="resetCode"
              id="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <button type="submit" className="w-100 btn bg-main text-white mt-4">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

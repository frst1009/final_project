import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const data = {
        email: email,
      };
      await axios.post("/api/user/forgottenPassword", data);
      navigate("/login");
    } catch (error) {
      setError("Something went wrong. Please check your email.");
    }
  };

  return (
    <section className="forgot-password-wrapper p-5">
      <div className="container-xxl">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-8 col-sm-10">
            <div className="card">
              <div className="card-body p-5">
                <h2 className="text-center">Forgot Password</h2>
                <p className="text-center mb-4">
                  Enter your email address to receive a password reset link.
                </p>
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email here ..."
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>{" "}
                  {error && <p className="text-danger">{error}</p>}
                  <div className="d-grid gap-2">
                    <button type="submit" className="input-button ">
                      Send Reset Link
                    </button>
                  </div>
                </form>
                <div className="mt-3 text-center">
                  <Link to="/login" className="form-link login-wrapper">
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

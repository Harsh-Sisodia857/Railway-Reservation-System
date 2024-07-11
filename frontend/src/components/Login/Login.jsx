import React, { useLayoutEffect, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import images from "../../themes/appImage";
import FacebookLogin from "./FacebookLogin";
import GoogleLogin from "./GoogleLogin";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Login = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const parsedData = state?.data ? JSON.parse(state.data) : null;


  const [mask, setMask] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 150,
    lazyLoad: true,
    autoplay: true,
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  const handleShowPassword = (values) => {
    if (values.length > 0) {
      setMask(!mask);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter valid email address.")
      .matches(/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-z]+(\.[a-zA-z]{2,8})+$/, "Please enter valid email address.")
      .required("Please enter email address."),
    password: Yup.string().required("Please enter password."),
  });

  const handleFormSubmit = (values) => {
    console.log(values)
  };

  const handleInputChange = (setValue, value, name, type, length) => {
    let data = value.target.value;
    if (type === "numberField") {
      data = data.replace(/[-[\]{}()+-.*+?.,\\^$|#\s]/g, "").slice(0, length);
      data.target.value = data.target.value.slice(0, length);
      return setValue(name, data.target.value.trimLeft());
    }
    if (data[0] === " ") {
      data = data.trim();
      return setValue(name, data.target.value.trimLeft());
    }
    return setValue(name, value.target.value.trimLeft());
  };

  return (
    <div className="wrapper-Login overflow-x-hidden h-[100vh]">
      <div className="row">
        <div className="col-sm-6 px-0">
          <div className="press password_small custom_padd">
            <div className="d-flex" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              <img src={images.back} style={{ width: "20px", margin: "0 17px 33px" }} />
              <span style={{ fontWeight: "600" }}>Back To Home Page</span>
            </div>
            <div className="container">
              <h2 className="line">Log In</h2>
              <div className="text-input-filed">
                <Formik
                  enableReinitialize
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleFormSubmit}
                >
                  {({ values, errors, handleBlur, handleChange, handleSubmit, touched, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          onSelect={(e) => !e.target.value && handleInputChange(setFieldValue, e, "email")}
                          onKeyDown={(e) => e.key === " " && !e.target.value.trim() && e.preventDefault()}
                          onChange={(e) => handleInputChange(setFieldValue, e, "email")}
                          onBlur={handleBlur}
                          placeholder="Email Address"
                          value={values.email.trim()}
                          autoComplete="off"
                        />
                        {touched.email && errors.email && <div className="color-error">{errors.email}</div>}
                      </div>
                      <div className="form-group password_change">
                        <label>Password</label>
                        <input
                          type={mask ? "text" : "password"}
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          onBlur={handleBlur}
                          autoComplete="off"
                          onSelect={(e) => !e.target.value && handleInputChange(setFieldValue, e, "password")}
                          onKeyDown={(e) => e.key === " " && !e.target.value.trim() && e.preventDefault()}
                          onChange={(e) => handleInputChange(setFieldValue, e, "password")}
                          value={values.password}
                        />
                        {touched.password && errors.password && <div className="color-error">{errors.password}</div>}
                        <img
                          src={values.password.length <= 0 ? images.unmask : mask ? images.eye : images.unmask}
                          onClick={() => handleShowPassword(values.password)}
                          className="icon_left"
                        />
                        <div className="text-right" style={{ marginTop: "6px" }}>
                          <span className="forgot-pass" onClick={() => setIsModalVisible(true)}>
                            Forgot Password?
                          </span>
                        </div>
                      </div>
                      <div className="login_button">
                        <div className="button_bottom">
                          <button type="submit" className="button text">
                            Login
                          </button>
                        </div>
                        <div className="button_bottom top_space_remove">
                          <button onClick={() => navigate("/register")} className="button text color_diff">
                            Register
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="slider_new pt-5">
            {/* <div className="d-flex align-items-center justify-content-center" style={{ marginTop: "-5px" }}>
              <input type="checkbox" name="service" value="Send me travel offers, trip reminders and other updates by email." id="cc" style={{ height: "30px" }} />
              &nbsp;&nbsp;
              <label htmlFor="cc" className="m-0">
                Send me travel offers, trip reminders and other updates by email.
              </label>
            </div> */}
            <Slider {...sliderSettings} style={{ marginTop: "10px" }}>
              <div>
                <img src={images.loginimage} />
                <div className="social-login-outer-wrapper d-flex flex-column">
                  <div className="registration-text-div row">
                    <p className="registration-heading">Already have an account?</p>
                    <p className="registraion-textt">
                      <Link style={{ color: "#7fd6c3" }} to="/register">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                  <div className="registration-text-div text-center d-flex flex-column">
                    <p className="registration-heading mb-1">By creating an account you agree to our</p>
                    <p className="registraion-textt">
                      <Link style={{ color: "#7fd6c3" }} to="/termsCondition">
                        Term Of Use
                      </Link>{" "}
                      and{" "}
                      <Link style={{ color: "#7fd6c3" }} to="/privacyPolicy">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                  <FacebookLogin text="Log in with Facebook" />
                </div>
              </div>
              <div>
                <img src={images.loginimage} />
                <div className="social-login-outer-wrapper d-flex flex-column">
                  <div className="registration-text-div row">
                    <p className="registration-heading">Already have an account?</p>
                    <p className="registraion-textt">
                      <Link style={{ color: "#7fd6c3" }} to="/register">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                  <div className="registration-text-div text-center d-flex flex-column">
                    <p className="registration-heading mb-1">By creating an account you agree to our</p>
                    <p className="registraion-textt">
                      <Link style={{ color: "#7fd6c3" }} to="/termsCondition">
                        Term Of Use
                      </Link>{" "}
                      and{" "}
                      <Link style={{ color: "#7fd6c3" }} to="/privacyPolicy">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                  <GoogleLogin text="Log in with Google" />
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
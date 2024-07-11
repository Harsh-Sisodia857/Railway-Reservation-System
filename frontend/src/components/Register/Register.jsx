import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Select } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import images from "../../themes/appImage";
import { PlusOutlined } from "@ant-design/icons";
import GoogleLogin from "../Login/GoogleLogin";
import FacebookLogin from "../Login/FacebookLogin";

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mask, setMask] = useState(false);
  const [confirmMask, setConfirmMask] = useState(false);
  const [userImage, setUserImage] = useState("");
  const imgInput = useRef(null);

  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 150,
    autoplay: true,
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    

    const handleInputChange = async (setValue, value, name, type, length) => {
      let data = value;
      if (type === "numberField") {
        data.target.value = data.target.value.replace(
          /[-[\]{}()+-.*+?.,\\^$|#\s]/g,
          "\\$&"
        );
        data.target.value = data.target.value.slice(0, length);
        return setValue(name, data.target.value.trimLeft());
      } else if (name === "profile") {
        const r = await toBase64(data.target.files[0]);
        setUserImage(r);
        return setValue(name, data.target.files[0]);
      } else {
        if (value.target.value[0] === " ") {
          data.target.value = data.target.value.trim();
          return setValue(name, data.target.value.trimLeft());
        }
        return setValue(name,value.target.value.trimLeft());
      }
    };
  

  const validationSchema = Yup.object({
    title: Yup.string().required("Please enter title."),
    firstName: Yup.string().required("Please enter first name."),
    lastName: Yup.string().required("Please enter last name."),
    address: Yup.string().required("Please enter address."),
    postalCode: Yup.string().required("Please enter postal code."),
    city: Yup.string().required("Please enter city."),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z]+(\.[a-zA-Z]{2,8})+$/,
        "Please enter valid email address."
      )
      .required("Please enter email address."),
    phone: Yup.string()
      .required("Please enter phone number.")
      .matches(
        /[1-9][0-9]{7,14}/,
        "Phone number should be between 8 to 15 digits."
      ),
    password: Yup.string()
      .required("Please enter password.")
      .min(6, "Password length should be at least 6 characters long."),
    confirmPassword: Yup.string()
      .required("Please enter confirm password.")
      .oneOf(
        [Yup.ref("password")],
        "Password and confirm password should be same."
      ),
  });

  const handleFormSubmit = (values, { setSubmitting }) => {
    console.log(values)
  };

  const handleSelectChange = (setValue, value) => setValue("title", value);

  const imageFocus = () => imgInput.current.click();

  const handleShowPassword = () => setMask(!mask);
  const handleShowConfirmPassword = () => setConfirmMask(!confirmMask);

  return (
    <div className="wrapper-Login register_i" style={{ overflowX: "hidden" }}>
      <div className="row">
        <div className="col-sm-6 px-0">
          <div className="press password_small">
            <div
              className="d-flex"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={images.back}
                style={{ width: "20px", margin: "0 17px 33px" }}
              />
              <span style={{ fontWeight: "600" }}>Back To Home Page</span>
            </div>
            <div className="container">
              <h2 className="line">Register</h2>
              <div className="text-input-filed">
                <Formik
                  initialValues={{
                    title: "",
                    firstName: "",
                    lastName: "",
                    address: "",
                    postalCode: "",
                    city: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                    profile: null,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleFormSubmit}
                >
                  {({
                    values,
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    touched,
                    setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div
                        className="team-img1"
                        style={{ overflow: "visible" }}
                      >
                        {userImage ? (
                          <img
                            alt=""
                            style={{ cursor: "pointer" }}
                            src={userImage}
                          />
                        ) : (
                          <img
                            src={images.Register_img}
                            style={{
                              height: "82px",
                              width: "82px",
                              margin: "0px",
                            }}
                            alt=""
                          />
                        )}
                        <div className="upload-img" onClick={imageFocus}>
                          <PlusOutlined />
                        </div>
                        <input
                          hidden
                          ref={imgInput}
                          type="file"
                          name="profile"
                          onChange={(e) =>
                            handleInputChange(setFieldValue, e, "profile")
                          }
                        />
                      </div>
                      <div className="form-group text-left">
                        <label>Title</label>
                        <Select
                          name="title"
                          placeholder="Title"
                          onBlur={handleBlur}
                          className={`form-control new_form_groups ${
                            errors.title ? "register_error" : "register"
                          }`}
                          onChange={(e) => handleSelectChange(setFieldValue, e)}
                        >
                          <Option value="Mr.">Mr.</Option>
                          <Option value="Miss.">Miss.</Option>
                          <Option value="Mrs.">Mrs.</Option>
                          <Option value="Other">Other</Option>
                        </Select>
                        {touched.title && errors.title && (
                          <div className="color-error">{errors.title}</div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-sm-6 px-0">
                          <div className="form-group">
                            <label>First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="First Name"
                              name="firstName"
                              maxLength={20}
                              onChange={(e) =>
                                handleInputChange(setFieldValue, e, "firstName")
                              }
                              onBlur={handleBlur}
                              value={values.firstName}
                            />
                            {touched.firstName && errors.firstName && (
                              <div className="color-error">
                                {errors.firstName}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6 px-0">
                          <div className="form-group">
                            <label>Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Last Name"
                              name="lastName"
                              maxLength={20}
                              onChange={(e) =>
                                handleInputChange(setFieldValue, e, "lastName")
                              }
                              onBlur={handleBlur}
                              value={values.lastName}
                            />
                            {touched.lastName && errors.lastName && (
                              <div className="color-error">
                                {errors.lastName}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address"
                          name="address"
                          onChange={(e) =>
                            handleInputChange(setFieldValue, e, "address")
                          }
                          onBlur={handleBlur}
                          value={values.address}
                        />
                        {touched.address && errors.address && (
                          <div className="color-error">{errors.address}</div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-sm-6 px-0">
                          <div className="form-group">
                            <label>Postal Code</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Postal Code"
                              name="postalCode"
                              onChange={(e) =>
                                handleInputChange(
                                  setFieldValue,
                                  e,
                                  "postalCode"
                                )
                              }
                              onBlur={handleBlur}
                              value={values.postalCode}
                              maxLength={8}
                            />
                            {touched.postalCode && errors.postalCode && (
                              <div className="color-error">
                                {errors.postalCode}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6 px-0">
                          <div className="form-group">
                            <label>City</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="City"
                              name="city"
                              onChange={(e) =>
                                handleInputChange(setFieldValue, e, "city")
                              }
                              onBlur={handleBlur}
                              value={values.city}
                            />
                            {touched.city && errors.city && (
                              <div className="color-error">{errors.city}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          name="email"
                          onChange={(e) =>
                            handleInputChange(setFieldValue, e, "email")
                          }
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {touched.email && errors.email && (
                          <div className="color-error">{errors.email}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Phone"
                          name="phone"
                          maxLength={15}
                          onChange={(e) =>
                            handleInputChange(
                              setFieldValue,
                              e,
                              "phone",
                              "numberField",
                              15
                            )
                          }
                          onBlur={handleBlur}
                          value={values.phone}
                        />
                        {touched.phone && errors.phone && (
                          <div className="color-error">{errors.phone}</div>
                        )}
                      </div>
                      <div className="form-group password_change">
                        <label>Password</label>
                        <input
                          type={mask ? "text" : "password"}
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          autoComplete="off"
                          onBlur={handleBlur}
                          onSelect={(e) => {
                            if (e.target.value === "") {
                              handleInputChange(setFieldValue, e, "password");
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === " " && e.target.value.length < 1) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) =>
                            handleInputChange(setFieldValue, e, "password")
                          }
                          value={values.password}
                        />
                        {touched.password && errors.password ? (
                          <div class="color-error">{errors.password}</div>
                        ) : null}
                        <img
                          alt=""
                          src={
                            values.password.length <= 0
                              ? images.unmask
                              : mask
                              ? images.eye
                              : images.unmask
                          }
                          onClick={() => handleShowPassword(values.password)}
                          className="icon_left"
                        />
                      </div>
                      <div className="form-group password_change">
                        <label>Confirm Password</label>
                        <input
                          type={confirmMask ? "text" : "password"}
                          className="form-control"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          autoComplete="off"
                          onBlur={handleBlur}
                          onSelect={(e) => {
                            if (e.target.value === "") {
                              handleInputChange(
                                setFieldValue,
                                e,
                                "confirmPassword"
                              );
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === " " && e.target.value.length < 1) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) =>
                            handleInputChange(
                              setFieldValue,
                              e,
                              "confirmPassword"
                            )
                          }
                          value={values.confirmPassword}
                        />
                        {touched.confirmPassword && errors.confirmPassword ? (
                          <div class="color-error">
                            {errors.confirmPassword}
                          </div>
                        ) : null}
                        <img
                          alt=""
                          src={
                            values.confirmPassword.length <= 0
                              ? images.unmask
                              : confirmMask
                              ? images.eye
                              : images.unmask
                          }
                          onClick={() =>
                            handleShowConfirmPassword(values.confirmPassword)
                          }
                          className="icon_left"
                        />
                      </div>
                      <div className="login_button">
                        <div
                          className="button_bottom"
                          style={{ marginBottom: "20px" }}
                        >
                          <button
                            type="submit"
                            // onClick={() => setIsModalVisible(true)}
                            class="button text"
                          >
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
        <div className="col-sm-6 px-0">
          <div className="slider_new">
            <Slider {...settings} style={{ marginTop: "15px" }}>
              <div>
                <img src={images.loginimage} />
                <div className="social-login-outer-wrapper d-flex flex-column">
                  <div className="registration-text-div row">
                    <p className="registration-heading">
                      Already have an account?
                    </p>
                    <p className="registraion-textt">
                      <Link style={{ color: "#7fd6c3" }} to="/login">
                        Sign In
                      </Link>
                    </p>
                  </div>
                  <div className="registration-text-div text-center d-flex flex-column">
                    <p className="registration-heading mb-1">
                      by creating an accout you agree to our
                    </p>
                    <p className="registraion-textt">
                      <Link style={{ color: "#7fd6c3" }} to="/termsCondition">
                        Term Of Use
                      </Link>{" "}
                      and{" "}
                      <Link style={{ color: "#7fd6c3" }} to="/privacyPolicy">
                        Privacy Policy
                      </Link>
                    </p>
                    <FacebookLogin text={"Sign up with Facebook"} />
                  </div>
                </div>
              </div>
              <div>
                <img src={images.loginimage} />
                <div className="social-login-outer-wrapper d-flex flex-column">
                  <div className="registration-text-div row">
                    <p className="registration-heading">
                      Already have an account?
                    </p>
                    <p className="registraion-textt">
                      <Link style={{ color: "#7fd6c3" }} to="/login">
                        Sign In
                      </Link>
                    </p>
                  </div>
                  <div className="registration-text-div text-center d-flex flex-column">
                    <p className="registration-heading mb-1">
                      by creating an accout you agree to our
                    </p>
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
                  <GoogleLogin text={"Sign In with Google"} />
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
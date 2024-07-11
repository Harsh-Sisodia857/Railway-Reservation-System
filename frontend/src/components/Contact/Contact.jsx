import React from "react";
import { Layout, Spin } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import images from "../../themes/appImage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Footer from "../Footer/Footer.jsx";
import Header from "../Home/Header";
import { appConstants } from "../../themes/appConstant.js";

const initialState = {
  first_name: "",
  last_name: "",
  country_code: "",
  mobile: "",
  how_can_help: "",
};

const ContactUs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (setValue, e, name, length) => {
    let value = e.target.value.replace(/[-[\]{}()+-.*+?.,\\^$|#\s]/g, "\\$&");
    value = value.slice(0, length).trimLeft();
    setValue(name, value);
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Please enter first name."),
    last_name: Yup.string().required("Please enter last name."),
    country_code: Yup.string()
      .required("Please enter country code.")
      .matches(/[1-9][0-9]{1,14}/, "Country code should be between 2 to 15 digits."),
    mobile: Yup.string()
      .required("Please enter mobile number.")
      .matches(/[1-9][0-9]{7,14}/, "Mobile number should be between 8 to 15 digits."),
    how_can_help: Yup.string().required("Please enter message."),
  });

  const handleFormSubmit = (values) => {
    console.log("Submitted values:", values);
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="mobileabout text-item spacert">
          <h3>{appConstants.contact}</h3>
        </div>
        <div className="row py-3">
          <div className="col-sm-6 d-flex flex-column">
            <img src={images.contact1} alt="contact" style={{ width: "100%" }} />
            {/* <img
              src={images.contact2}
              alt="contact"
              style={{ width: "100%", marginTop: "10px" }}
            /> */}
          </div>
          <div className="col-sm-6">
            <h2 className="line text-left">
              {appConstants.contactfirst}
              <br />
              <span className="color-d">{appConstants.contactsecond}</span>
            </h2>
            <p>
              Want to know more about what we’re doing here at The Passenger Hub or have a ticket-related question that isn’t answered on our website? We’d love to hear your questions, comments or feedback - just fill in the form below and we’ll get back to you shortly.
            </p>
            <Formik
              initialValues={initialState}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ values, errors, handleSubmit, touched, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-6">
                        <label>
                          <small>
                            <b>First Name</b>
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          value={values.first_name}
                          name="first_name"
                          onKeyDown={(e) => {
                            if (e.key === " ") e.preventDefault();
                          }}
                          onChange={(e) => handleInputChange(setFieldValue, e, "first_name", 15)}
                        />
                        {touched.first_name && errors.first_name && (
                          <div className="color-error">{errors.first_name}</div>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <label>
                          <small>
                            <b>Last Name</b>
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          value={values.last_name}
                          name="last_name"
                          onKeyDown={(e) => {
                            if (e.key === " ") e.preventDefault();
                          }}
                          onChange={(e) => handleInputChange(setFieldValue, e, "last_name", 15)}
                        />
                        {touched.last_name && errors.last_name && (
                          <div className="color-error">{errors.last_name}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-6">
                        <label>
                          <small>
                            <b>Country Code</b>
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Country Code"
                          value={values.country_code}
                          name="country_code"
                          onKeyDown={(e) => {
                            if (e.key === " ") e.preventDefault();
                          }}
                          onChange={(e) => handleInputChange(setFieldValue, e, "country_code", 15)}
                        />
                        {touched.country_code && errors.country_code && (
                          <div className="color-error">{errors.country_code}</div>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <label>
                          <small>
                            <b>Mobile</b>
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mobile"
                          value={values.mobile}
                          name="mobile"
                          onKeyDown={(e) => {
                            if (e.key === " ") e.preventDefault();
                          }}
                          onChange={(e) => handleInputChange(setFieldValue, e, "mobile", 15)}
                        />
                        {touched.mobile && errors.mobile && (
                          <div className="color-error">{errors.mobile}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>
                      <small>
                        <b>How can we help?</b>
                      </small>
                    </label>
                    <textarea
                      className="form-control lef-contact"
                      placeholder={appConstants.how_can_help}
                      name="how_can_help"
                      rows="3"
                      value={values.how_can_help}
                      onKeyDown={(e) => {
                        if (e.key === " " && e.target.value.length < 1) e.preventDefault();
                      }}
                      onChange={(e) => handleInputChange(setFieldValue, e, "how_can_help", 500)}
                    ></textarea>
                    {touched.how_can_help && errors.how_can_help && (
                      <div className="color-error">{errors.how_can_help}</div>
                    )}
                  </div>
                  <div className="button_bottom text-center">
                    <button className="button text" type="submit">
                      SEND
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
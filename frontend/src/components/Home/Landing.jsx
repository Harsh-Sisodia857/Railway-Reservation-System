import React, { useState } from "react";
import { Collapse } from "antd";
import images from "../../themes/appImage";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "./Header";

const { Panel } = Collapse;

const Landing = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [imageSrc, setimageSrc] = useState(images.mobilecut);
  const [imageBanner, setBannerImg] = useState(images.banner1);
  const [maskImg, setMaskImg] = useState(images.maskvalue);
  const [imageBannerClass, setBannerImgClass] = useState("slide-top");
  const [fadeAnimClass, setFadeAnimClass] = useState("value-text-jo");

  const validateBuyNow = (type) => {
    // if (!localStorage.getItem("token")) {
    //   navigate("/login", {
    //     state: { prevPage: type },
    //   });
    //   return;
    // }

    if (!userProfileDetail?.isSocailAccount) {
      navigate(`/${type}`, {
        state: { key: "landingPage" },
      });
      return;
    }
    if (
      !userProfileDetail?.title ||
      !userProfileDetail?.firstName ||
      !userProfileDetail?.fullName ||
      !userProfileDetail?.address ||
      !userProfileDetail?.postalCode ||
      !userProfileDetail?.city ||
      !userProfileDetail?.countryCode ||
      !userProfileDetail?.phoneNumber
    ) {
      setOpen(true);
      console.log(userProfileDetail);
      return;
    } else {
      navigate(`/${type}`, {
        state: { prevPage: "landingPage" },
      });
      return;
    }
  };

  return (
    <div>
      <Header/>
      <section className="banner-section">
        <div className="container-fluid">
          <h2 className="line">
            Train travel made
            <span className="color-d"> Cheaper and Greener</span>
          </h2>
          <div className="row">
            <div className="col-md-6">
              <h5 className="pl-5 pt-4">
                It’s time to stop overpaying for your commute.
              </h5>
              <h5 className="pl-5">
                Split the cost of your train ticket over 12 months, and{" "}
                <span className="color-d">
                  save up to 20% compared to booking daily tickets.
                </span>
              </h5>
              <div className="home-banner-section1">
                <div className="container-fluid d-flex pt-4 pl-5">
                  <div className="mr-5">
                    <img
                      alt=""
                      src={images.oyster}
                      style={{ width: "200px", height: "125px", cursor: "pointer" }}
                      onClick={() => {
                        validateBuyNow("purchaseoyster");
                      }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src={images.travel}
                      style={{ width: "200px", height: "125px", cursor: "pointer" }}
                      onClick={() => {
                        validateBuyNow("newBookings");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
            <div className="banner_text">
                <img
                  alt=""
                  src={imageBanner}
                  className={imageBannerClass}
                  style={{ width: "550px", paddingRight: "40px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="logistics text-center" style={{ height: "450px" }}>
        <div className="container">
          <h2 className="line pt-4">Carbon-friendly Commuting</h2>
          <p className="text-line small-text">
            We’re on a mission to change the way people travel. We want to make
            travelling by train cheaper and greener, doing our part in the global
            journey to reach net zero emissions.
          </p>
          <h4 className="line pt-4">
            <b>Why choose train travel?</b>
          </h4>
          <br />
          <div className="row">
            <div className="col-md-4">
              <div className="text-center">
                <span className="button same1">Reduce CO2</span>
              </div>
              <p className="shopp-text">
                We can only meet climate targets if we reduce the 60% of CO2 road
                emissions that cars are responsible for.
              </p>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <span className="button same1">Get To Work Happier</span>
              </div>
              <p className="shopp-text">
                Say goodbye to rush hour traffic, higher fuel consumption, and
                unpredictable journey times.
              </p>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <span className="button same1">No Parking</span>
              </div>
              <p className="shopp-text">
                Hop on, hop off, with no need to search for expensive city-centre
                parking options or negotiate busy traffic.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="hub-section">
        <div className="container happy_sec">
          <div className="row">
            <div className="col-md-4">
              <img alt="" src={imageSrc} style={{ width: "283px" }} />
            </div>
            <div className="col-md-8 passenger">
              <h3 className="top-left">Still to come...</h3>
              <p className="one-time">
                Book your journey end-to-end using The Passenger Hub, including
                reserving bikes, e-scooters, and more.
              </p>
              <p className="one-time">
                Subscribe now to be one of the first to try our new micro-mobility
                services, and be kept up-to-date on the launch.
              </p>
              <div className="text-center">
                <span className="button same1">Join Now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="happy-section">
        <div
          className="container special_margin"
          style={{ marginRight: "0px!important" }}
        >
          <div className="row">
            <div className="col-md-6 top-down">
              <h3>The ultimate getting-to-work perk</h3>
              <h4>
                Give your employees the ultimate getting to work perk by
                bringing the passenger hub to your organisation.
              </h4>
              <div
                className="text-line small-text"
                style={{ textAlign: "left" }}
              >
                Attract your top talent back to the office by offering
                discounted season tickets, bought through us and subsidised by
                you.
                <br />
                Or if you're self-employed, get a cheaper season ticket
                alongside a monthly receipt for your expenses.
              </div>
              <ul class="auto-switch mt-4 d-xl-block">
                <li
                  className={
                      "button text first active1"
                  }
                >
                  Reduce CO2
                </li>
                <li
                  className={
                  "button text long-b"
                  }
                >
                  Get to Work Happier
                </li>
                <li
                  className={
                    "button text last active1"
                  }
                >
                  Save Parking Space
                </li>
              </ul>
            </div>
            <div className="col-md-6 special_padding">
              {
                <img
                  alt=""
                  src={maskImg}
                  className={fadeAnimClass}
                  style={{ width: "100%", height: "557px" }}
                />
              }
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;

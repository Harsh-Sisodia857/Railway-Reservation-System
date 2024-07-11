import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "antd";
import images from "../../themes/appImage";
import { appConstants } from "../../themes/appConstant";
import Header from "../Home/Header.jsx";
import Footer from "../Footer/Footer.jsx";

const AboutUs = () => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    document.title = "The PassengerHub";
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      profile: images.img,
      name: "Fraser Robinson",
      designation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      linkedin: images.linkdin,
    },
    {
      profile: images.img1,
      name: "Fraser Robinson",
      designation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      linkedin: images.linkdin,
    },
    {
      profile: images.img2,
      name: "Fraser Robinson",
      designation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      linkedin: images.linkdin,
    },
    {
      profile: images.img3,
      name: "Fraser Robinson",
      designation: "CEO and Co-Founder",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      linkedin: images.linkdin,
    },
  ];

  return (
    <div>
      <Header/>
      <div className="mobileabout">
        <div className="container-fluid spacert">
          <h3>{appConstants.aboutUs}</h3>
        </div>
      </div>
      <div className="about-text">
        <div className="container">
          <h2 className="line">
            We’re here to <span className="color-d">disrupt</span> your commute. <br />
            In a good way.
          </h2>
        </div>
      </div>

      <div className="about-text">
        <div className="container">
          <div className="row text-black">
            <div className="col-sm-4">
              <h1 className="text-center" style={{ fontSize: "40px", fontWeight: 800, color: "#00D9B2" }}>
                21
              </h1>
              <p className="text-about text-center" style={{ paddingTop: "1rem", fontSize: "20px", fontWeight: 600 }}>
                The number of train trips the average person makes each year
              </p>
            </div>
            <div className="col-sm-4">
              <h1 className="text-center" style={{ fontSize: "40px", fontWeight: 800, color: "#00D9B2" }}>
                580
              </h1>
              <p className="text-about text-center" style={{ paddingTop: "1rem", fontSize: "20px", fontWeight: 600 }}>
                The number of car trips the average person makes each year.
              </p>
            </div>
            <div className="col-sm-4">
              <h1 className="text-center" style={{ fontSize: "40px", fontWeight: 800, color: "#00D9B2" }}>
                5 million
              </h1>
              <p className="text-about text-center" style={{ paddingTop: "1rem", fontSize: "20px", fontWeight: 600 }}>
                The number of people who would swap car for train if the journey was more seamless.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-text">
        <div className="container">
          <div className="row text-black">
            <div className="col-sm-6">
              <p className="text-about" style={{ lineHeight: 1, fontSize: "20px", fontWeight: 600 }}>
                The idea behind The Journey Hub came when co-founders Oliver and Richard found themselves spending hours in the car...
              </p>
              <br />
              <p className="text-about" style={{ lineHeight: 1, fontSize: "20px", fontWeight: 600 }}>
                After so much time in the car, it became obvious that train travel would be preferable...
              </p>
            </div>
            <div className="col-sm-6">
              <img src={images.contact2} style={{ width: "100%", height: "380px", color: "#00D9B2" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="about-text">
        <div className="container">
          <div className="row text-black">
            <div className="col-sm-6">
              <img src={images.about} style={{ width: "100%", height: "320px", color: "#00D9B2" }} />
            </div>
            <div className="col-sm-6">
              <p className="text-about" style={{ lineHeight: 1, fontSize: "20px", fontWeight: 600 }}>
                While train travel is at its core, the secret ingredient is the addition of micromobility...
              </p>
              <p className="text-about" style={{ lineHeight: 1, fontSize: "20px", fontWeight: 600 }}>
                Today, that means making train travel more affordable...
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-text team">
        <div className="container">
          <h2 className="line">Meet the team</h2>
        </div>
        <div className="container-fluid">
          <div className="row first-text">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-md-4">
                <div className="team-text text-center">
                  <div className="team-img">
                    <img src={member.profile} alt={`${member.name}'s profile`} />
                    <span className="LinkedIn">
                      <img src={member.linkedin} alt="LinkedIn" />
                    </span>
                  </div>
                  <h3>{member.name}</h3>
                  <h2>{member.designation}</h2>
                  <hr />
                  <p>{member.desc}</p>
                  <hr />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;

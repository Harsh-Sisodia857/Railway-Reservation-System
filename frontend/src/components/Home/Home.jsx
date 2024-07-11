import React, { useState, useEffect, useLayoutEffect } from "react";
import { Layout, Menu } from "antd";
import images from "../../themes/appImage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";

const Home = (props) => {
  const navigate = useNavigate();
  
 
  return (
    <div>
      <Header />
      
      <div className="home-banner-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            
            
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Home;

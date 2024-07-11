import React, { useLayoutEffect, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Breadcrumb, Layout, Menu } from "antd";
import images from "./../../themes/appImage";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { serverUrl } from "../../themes/appConstant";


const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();  

  const { SubMenu } = Menu;
  let {user} = useSelector((state => state.user));
  const [LogoChange, setLogoChange] = useState(images.logohome);

  const userData = user.details;
  let token = user.token
  const isLoggedOut = token ? true : false;
  
  useLayoutEffect(() => {
    if (isLoggedOut) {
      navigate("/");
    }
  }, [isLoggedOut]);


  let activeKey = "";
  switch (location.pathname) {
    case "/about":
      activeKey = "/about";
      break;
    case "/login":
      activeKey = "/login";
      break;
    case "/register":
      activeKey = "/register";
      break;
    case "/landing":
      activeKey = token ? "" : "/landing";
      break;
  }

  // localStorage.setItem('token', '123456789')

  const handleClick = (e) => {
    console.log("click ", e);
  };

  const onLoad = () => randomBgColor();

  const randomBgColor = () => {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    const bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor;
  }

  
  const handleScroll = () => {
    if (window.pageYOffset >= 10) {
      console.log("Scrolling");
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    handleScroll()
  }, [])

  return (
    <>
      {!token ? (
        <div className="header-home" style={{ background: {handleScroll} ? "white" : "transparent"}}>
          <div className="container-fluid">
            <div className="header-desktop">
              <Menu
                responsive="false"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={[activeKey]}
                selectedKeys={[activeKey]}
                mode="horizontal"
                onClick={handleClick}
              >
                <Menu.Item key="/landing">
                  <Link to="/">
                    <img src={LogoChange} style={{ width: "280px" }} />
                  </Link>
                </Menu.Item>
                <Menu.Item key="/about">
                  <Link to="/about">
                    <span >About Us</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/login">
                  <Link to="/login">
                    <span className="line_dash button_space">
                      <span
                        className="button same"
                        style={{ backgroundColor: "#11475B", color: "#fff" }}
                      >
                        Sign In
                      </span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/register">
                  <Link to="/register">
                    <span className="line_dash button_space">
                      <span className="button same">Sign Up</span>
                    </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/contactus" style={{ marginLeft: "-7px" }}>
                  <Link to="/contactus">
                    <span className="line_dash button_space">
                      <span className="button same2">Contact Us</span>
                    </span>
                  </Link>
                </Menu.Item>
              </Menu>
            </div>
            <div className="menu_left_toogle d-flex responsive-header">
              <img
                alt=""
                src={images.logohome}
                style={{ width: "280px" }}
                onClick={() => {
                  navigate("/");
                }}
              />
              <div className="lite-text" onClick={() => props.handleClick()}>
                <MenuOutlined />
              </div>
            </div>
          </div>
        </div>
      ) : (
          <div className="header-home" style={{ background: handleScroll() ? "white" : "transparent" }}>
          <div className="container-fluid">
            <div className="header-desktop">
              <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={[activeKey]}
                selectedKeys={[activeKey]}
                mode="horizontal"
                onClick={handleClick}
              >
                <Menu.Item
                  key="/landing"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <img src={images.logohome} style={{ width: "280px" }} />
                </Menu.Item>

                <SubMenu key="SubMenu" title="My Account" className="item_team">
                  <Menu.Item
                    key="/landing"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                      // window.history.replaceState({}, document.title)
                      dispatch(logoutInitiate());
                    }}
                  >
                    Logout
                  </Menu.Item>
        
                </SubMenu>
    
                <Menu.Item>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#00BB9C",
                        paddingRight: "18px",
                        paddingLeft: "15px",
                        marginBottom: "0px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "180px",
                      }}
                    >
                      {userData?.fullName ? userData?.fullName : ""}
                    </label>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        lineHeight: "26px",
                          paddingTop: "3px",
                        position : "relative"
                      }}
                    >
                        {
                          userData?.profileImage ?
                            <img
                              className="profile_img"
                              onClick={() => navigate("/Profile")}
                              src={
                                userData?.isSocailAccount && userData?.profileImage
                                  ? userData?.profileImage
                                  : userData?.profileImage
                                    ? `${serverUrl.url}${userData?.profileImage}`
                                    : images.img2
                              }
                              style={{
                                width: "35px!important",
                                height: "35px",
                                borderRadius: "50%",
                                cursor: "pointer",
                              }}
                            /> :
                            <div className="defaultImage" style={{
                              borderRadius: "50%",
                              position: "absolute",
                              fontSize: "18px",
                              width: "100%",
                              height: "100%",
                              textAlign: "center",
                              paddingTop: "6px",
                              fontWeight: "bold",
                              background: onLoad(),
                              color : "white"
                            }}>{userData.lastName ? userData.firstName.charAt(0).toUpperCase() + userData.lastName.charAt(0).toUpperCase() : userData.firstName.charAt(0).toUpperCase() + userData.firstName.charAt(1)}
                            </div>
                        }
                    </div>
                  </div>
                </Menu.Item>
              </Menu>
            </div>
            <div className="menu_left_toogle d-flex responsive-header">
              <img
                alt=""
                src={images.logohome}
                style={{ width: "280px" }}
                onClick={() => {
                  navigate("/");
                }}
              />
              <div className="hamburger_menu">
                <label
                  style={{
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "#00BB9C",
                    paddingRight: "18px",
                    paddingLeft: "15px",
                    marginBottom: "0px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "180px",
                  }}
                >
                  {userData?.fullName ? userData?.fullName : ""}
                </label>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      lineHeight: "26px",
                      paddingTop: "3px",
                    }}
                  >
                   
                    {
                      userData?.profileImage ?
                        <img
                          className="profile_img"
                          onClick={() => navigate("/Profile")}
                          src={
                            userData?.isSocailAccount && userData?.profileImage
                              ? userData?.profileImage
                              : userData?.profileImage
                                ? `${serverUrl.url}${userData?.profileImage}`
                                : images.img2
                          }
                          style={{
                            width: "35px!important",
                            height: "35px",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                        /> :
                        <div className="defaultImage" style={{
                          borderRadius: "50%",
                          position: "absolute",
                          fontSize: "80px",
                          width: "100%",
                          height: "100%",
                          textAlign: "center",
                          paddingTop: "25px",
                          fontWeight: "bold",
                          background: onLoad()
                        }}>{userData.lastName ? userData.firstName.charAt(0).toUpperCase() + userData.lastName.charAt(0).toUpperCase() : userData.firstName.charAt(0).toUpperCase() + userData.firstName.charAt(1)}
                        </div>
                    }
                  </div>
              </div>
              <div className="lite-text" onClick={() => props.handleClick()}>
                <MenuOutlined />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;

import React from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

function FacebookLogin({ text }) {

  function handleUserLogin(data) {
    console.log(data)
  }
  return (
    <div className="social-login-inner-wrapper">
      <LoginSocialFacebook
        appId={"614466960479720" || ""}
        fieldsProfile={
          "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
        }
        onResolve={({ provider, data }) => {
          console.log(data, provider);
          handleUserLogin(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <FacebookLoginButton text={text} style={{ borderRadius: "11px" }} />
      </LoginSocialFacebook>
    </div>
  );
}

export default FacebookLogin;

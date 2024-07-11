import React from "react";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useLocation, useNavigate } from "react-router";

function GoogleLogin({ text }) {

  function handleUserLogin(data) {
    console.log(data)
  }

  return (
    <div className="social-login-inner-wrapper">
      <LoginSocialGoogle
        client_id={
          "310723912321-33dn2kc09a3blbukq8eq5cmah5m8qqd0.apps.googleusercontent.com" ||
          ""
        }
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }) => {
          console.log(provider, data);
          handleUserLogin(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton text={text} style={{ borderRadius: "11px" }} />
      </LoginSocialGoogle>
    </div>
  );
}

export default GoogleLogin;

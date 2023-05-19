import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
export default () => {
  useEffect(() => {
    window.FB.init({
      appId: "1399631517488334", // Facebook App ID
      cookie: true, // enable cookies
      xfbml: true, // parse social plugins on this page
      version: "v16.0", //Graph API version
    });
  }, []);
  const launchWhatsAppSignup = () => {
    window.fbq &&
      window.fbq("trackCustom", "WhatsAppOnboardingStart", {
        appId: "1399631517488334",
        feature: "whatsapp_embedded_signup",
      });
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const { accessToken } = response.authResponse;
          //Use this token to call the debug_token API and get the shared WABA's ID
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope: "whatsapp_business_management",
        extras: {
          feature: "whatsapp_embedded_signup",
          setup: {
            // ... // Prefilled data can go here
          },
          sessionInfoVersion: 1,
        },
      }
    );
  };
  return (
    <div>
      <h2>项目存在未解决的问题</h2>
      <p>1、视频:开启了跨域隔离导致第三方网站的文件不能访问如阿里巴巴在线图标库</p>

      <Button type="primary" onClick={() => launchWhatsAppSignup()}>
        Connect more
      </Button>
    </div>
  );
};

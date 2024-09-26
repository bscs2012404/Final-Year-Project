import React from "react";

import { useSelector } from "react-redux";

import { Row, Col } from "antd";

import bg from "../../../assets/images/pages/authentication/authentication-bg.svg";
import bgDark from "../../../assets/images/pages/authentication/authentication-bg-dark.svg";

import MenuLogo from '../../../layout/components/menu/logo'
import LinkhubFypLogo from "../../../assets/images/logo/logo2.png";
// import ads from ""
export default function LeftContent() {
  // Redux
  const theme = useSelector(state => state.customise.theme)

  return (
    <Col lg={12} span={24} style={{display: "flex", alignItems:"center", justifyContent: "center", backgroundColor:'#d4dee3'}} className="">
      {/* Linkhub Fyp Sidebar */}
      <img src={LinkhubFypLogo} alt="logo" height="40%" width="50%" />

    </Col>
  );
};
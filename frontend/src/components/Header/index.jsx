import React from "react";
import { Logo } from "./Logo";
import { User } from "./User";
import { Button } from "../Button";
import logo from "../../corgi-logo.png";
import "./index.css";
import { LOGIN_LABEL } from "../../utils/constants";
export const Header = () => {
  return (
    <div id="header-container">
      <Logo src={logo}></Logo>
      <User></User>
      <Button onClick={() => {}} buttonText={LOGIN_LABEL}></Button>
    </div>
  );
};

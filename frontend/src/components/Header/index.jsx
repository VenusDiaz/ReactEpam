import React from "react";
import { Logo } from "./Logo";
import { User } from "./User";
import { Button } from "../Button";

export const Header = () => {
  return (
    <div>
      <Logo></Logo>
      <User></User>
      <Button></Button>
    </div>
  );
};

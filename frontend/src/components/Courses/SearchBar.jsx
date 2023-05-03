import React from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { ADD_COURSE_LABEL, SEARCH_LABEL } from "../../utils/constants";

export const SearchBar = () => {
  return (
    <div className="search-container">
      <Input />
      <Button
        className={"button-search"}
        buttonText={SEARCH_LABEL}
        onClick={() => {}}
      ></Button>
      <Button
        className={"button-add"}
        buttonText={ADD_COURSE_LABEL}
        onClick={() => {}}
      ></Button>
    </div>
  );
};

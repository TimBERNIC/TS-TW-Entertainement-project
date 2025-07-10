import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 flex justify-between items-center p-4">
      <Button
        title="Home"
        btnFunction={() => {
          navigate("/");
        }}
      />
      <Button
        title="To Do List"
        btnFunction={() => {
          navigate("/to-do-list");
        }}
      />
      <Button
        title="About"
        btnFunction={() => {
          navigate("/about");
        }}
      />
    </div>
  );
};

export default NavBar;

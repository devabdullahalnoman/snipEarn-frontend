import React from "react";
import { Outlet } from "react-router";
import { useLottie } from "lottie-react";
import animation from "../../Animation/zpunet icon.json";
import Navbar from "../shared/Navbar";

const AuthLayout = () => {
  const options = {
    animationData: animation,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div>
      <Navbar></Navbar>
      <div className="grid lg:grid-cols-2 lg:w-11/12 mx-auto py-10 h-[70vh]">
        <Outlet></Outlet>
        <div className="rounded-xl hidden lg:flex max-w-8/12 mx-auto">
          {View}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

import React from "react";
import { NavigationProps } from "./typings";

const Navigation = (props: NavigationProps) => {
  const {
    onBackClick,
    onNextClick,
    onHomeClick,
    backBtnDisabled,
    nextBtnDisabled,
  } = props;
  return (
    <div className="flex flex-row h-10 space-x-1">
      <div
        className={`flex justify-center items-center w-9 h-9 rounded-full hover:bg-gray-200 ${
          backBtnDisabled ? "pointer-events-none opacity-50" : ""
        }`}
        onClick={() => onBackClick()}
      >
        <img src={"/icons/back.svg"} alt="&#8592;" />
      </div>
      <div
        className={`flex justify-center items-center w-9 h-9 rounded-full hover:bg-gray-200 ${
          nextBtnDisabled ? "pointer-events-none opacity-50" : ""
        }`}
        onClick={() => onNextClick()}
      >
        <img src={"/icons/next.svg"} alt="&#8594;" />
      </div>
      <div
        className="flex justify-center items-center w-9 h-9 rounded-full hover:bg-gray-200"
        onClick={() => onHomeClick()}
      >
        <img src={"/icons/home.svg"} alt="" />
      </div>
    </div>
  );
};

export default Navigation;

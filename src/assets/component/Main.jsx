import React from "react";
import iconList from "../images/icon-list.svg";
import illustration from "../images/illustration-sign-up-desktop.svg";
import illustrationMobile from "../images/illustration-sign-up-mobile.svg";
import { useState, useEffect } from "react";

function Main() {
  const [email, setEmail] = useState("");
  const [openMedal, setOpenMedal] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const illustrationSrc = windowWidth < 768 ? illustrationMobile : illustration;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValid(true);
  };

  const handleSubscribe = () => {
    if (!isValidEmail(email)) {
      setIsValid(false);
      return;
    }
    console.log("Subscribed with email:", email);
    setOpenMedal(true);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleDismiss = () => {
    setOpenMedal(false);
  };

  function Medal() {
    return (
      <div className="w-[350px] p-[40px] bg-white rounded-2xl">
        <div className="pb-10">
          <img src={iconList} alt="" width={50} />
        </div>
        <h1 className="text-[32px] font-[700] leading-8 mb-6">
          Thanks for subscribing!
        </h1>
        <p className="text-[12px] mb-10">
          A confirmation email has been sent to{" "}
          <span className="font-[700]">{email}</span> Please open it and click
          the button inside to confirm your subscription.
        </p>
        <button
          className="w-full bg-[--Charcoal-Grey] text-white py-3 text-[12px] rounded-md"
          onClick={handleDismiss}
        >
          Dismiss message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 flex justify-center items-center h-[1000px] relative ">
      <div className="flex flex-row justify-center items-center p-[30px]  w-[1000px]  bg-white rounded-[40px] max-sm:flex max-sm:flex-col-reverse max-sm:rounded-none max-sm:p-0 ">
        <div className="w-[35vw] pl-[40px] pr-[70px]  flex flex-col justify-center max-sm:flex max-sm:flex-col max-sm:w-full max-sm:justify-between max-sm:p-6">
          <h1 className="text-[48px] font-[700] pb-6">Stay updated!</h1>
          <p className="pb-4">
            Join 60,000+ product managers receiving monthly updates on:
          </p>
          <div className="flex flex-row py-2 ">
            <img src={iconList} alt="" />
            <p className="pl-4 ">Product discovery and building what matters</p>
          </div>
          <div className="flex flex-row py-2]">
            <img src={iconList} alt="" />
            <p className="pl-4">Measuring to ensure updates are a success</p>
          </div>
          <div className="flex flex-row py-2">
            <img src={iconList} alt="" />
            <p className="pl-4">And much more!</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="pt-4 text-[14px] font-[700] py-4">Email address</p>{" "}
            <p className="pt-4 text-[14px] font-[700] py-4 text-red-400">
              {isValid ? "" : "Invalid email address!"}
            </p>
          </div>
          <input
            type="email"
            className={`py-4 px-8 border-black border-solid border-[1px] rounded-xl mb-8 ${
              isValid ? "" : "bg-red-200 border-red-500"
            }`}
            value={email}
            onChange={handleEmailChange}
          />
          <button
            className="py-4  rounded-xl font-[700] bg-[--Dark-Slate-Grey] text-white"
            onClick={handleSubscribe}
          >
            Subscribe to monthly newsletter
          </button>
        </div>
        <img
          src={illustrationSrc}
          alt=""
          className="responsive-image max-sm:"
        />
      </div>

      {openMedal && (
        <div className="absolute bg-slate-400 w-full h-full  top-50 left-50 bg-opacity-50 flex justify-center items-center ">
          <Medal className="absolute " />
        </div>
      )}
    </div>
  );
}

export default Main;

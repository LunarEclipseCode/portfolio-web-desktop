"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-left mb-80 lg:mb-60 md:mb-96 2xl:mb-0 justify-self-start lg:pt-0 md:pt-4 sm:pt-8 pt-12"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, I&apos;m{" "}
            </span>
            <br></br>
            <span className="block mb-2 sm:mb-3 md:mb-3 lg:mb-0"></span>
            <TypeAnimation
              sequence={[
                "Raj",
                1000,
                "Jack of All Trades",
                1000,
                "Master of Nothing",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-xl sm:text-xl md:text-xl mb-6 lg:text-2xl">
            Welcome to my portfolio.
          </p>
          <div>
            <div className="flex-col md:flex-row hidden xs:hidden sm:hidden md:hidden lg:flex gap-5">
              <Link
                href="https://windows.raj-datta.com"
                className="relative inline-block text-lg max-w-[200px] rounded-full overflow-hidden"
              >
                <span
                  className="absolute z-0 rounded-full border-4 border-transparent bg-gradient-to-br from-primary-500 to-secondary-500 bg-no-repeat"
                  style={{
                    top: "-4px",
                    right: "-5px",
                    bottom: "-4px",
                    left: "-4px",
                  }}
                ></span>

                <span
                  className="relative z-10 block px-5 py-3 bg-black rounded-full hover:bg-gradient-to-br from-primary-500 to-secondary-500"
                  style={{ margin: "2px" }}
                  onMouseEnter={() => {   // Create the gradient hover effect on buttons
                    const textSpan = document.querySelector(".windows-full");
                    if (textSpan) {
                      textSpan.classList.remove("text-transparent");
                      textSpan.classList.add("text-black"); 
                    }
                  }}
                  onMouseLeave={() => {
                    const textSpan = document.querySelector(".windows-full");
                    if (textSpan) {
                      textSpan.classList.remove("text-black");
                      textSpan.classList.add("text-transparent");
                    }
                  }}
                >
                  <span className="windows-full block bg-gradient-to-br from-primary-500 to-secondary-700 bg-clip-text text-transparent">
                    Windows
                  </span>
                </span>
              </Link>

              <Link
                href="https://macos.raj-datta.com"
                className="relative inline-block text-lg max-w-[200px] rounded-full overflow-hidden"
              >
                <span
                  className="absolute z-0 rounded-full border-4 border-transparent bg-gradient-to-br from-primary-500 to-secondary-500 bg-no-repeat"
                  style={{
                    top: "-4px",
                    right: "-5px",
                    bottom: "-4px",
                    left: "-4px",
                  }}
                ></span>
                <span
                  className="relative z-10 block px-5 py-3 bg-black rounded-full hover:bg-gradient-to-br from-primary-500 to-secondary-500"
                  style={{ margin: "2px" }}
                  onMouseEnter={() => {
                    const textSpan = document.querySelector(".macos-full");
                    if (textSpan) {
                      textSpan.classList.remove("text-transparent");
                      textSpan.classList.add("text-black"); 
                    }
                  }}
                  onMouseLeave={() => {
                    const textSpan = document.querySelector(".macos-full");
                    if (textSpan) {
                      textSpan.classList.remove("text-black");
                      textSpan.classList.add("text-transparent");
                    }
                  }}
                >
                  <span className="macos-full block bg-gradient-to-br from-primary-500 to-secondary-700 bg-clip-text text-transparent">
                    MacOS
                  </span>
                </span>
              </Link>

              <Link
                href="https://linux.raj-datta.com"
                className="relative inline-block text-lg max-w-[200px] rounded-full overflow-hidden"
              >
                <span
                  className="absolute z-0 rounded-full border-4 border-transparent bg-gradient-to-br from-primary-500 to-secondary-500 bg-no-repeat"
                  style={{
                    top: "-4px",
                    right: "-5px",
                    bottom: "-4px",
                    left: "-4px",
                  }}
                ></span>
                <span
                  className="relative z-10 block px-5 py-3 bg-black rounded-full hover:bg-gradient-to-br from-primary-500 to-secondary-500"
                  style={{ margin: "2px" }}
                  onMouseEnter={() => {
                    const textSpan = document.querySelector(".linux-full");
                    if (textSpan) {
                      textSpan.classList.remove("text-transparent");
                      textSpan.classList.add("text-black");
                    }
                  }}
                  onMouseLeave={() => {
                    const textSpan = document.querySelector(".linux-full");
                    if (textSpan) {
                      textSpan.classList.remove("text-black");
                      textSpan.classList.add("text-transparent");
                    }
                  }}
                >
                  <span className="linux-full block bg-gradient-to-br from-primary-500 to-secondary-700 bg-clip-text text-transparent">
                    Linux
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute flex bottom-0 z-[20] right-5 flex-col lg:hidden xl:hidden 2xl:hidden gap-4 sm:gap-5"
        >
          <div className="absolute flex bottom-14 sm:bottom-10 z-[20] right-3 flex-col lg:hidden xl:hidden 2xl:hidden gap-4 sm:gap-5">
            <Link
              href="https://windows.raj-datta.com"
              className="relative inline-block text-lg max-w-[200px] rounded-full overflow-hidden"
            >
              <span
                className="absolute z-0 rounded-full border-4 border-transparent bg-gradient-to-br from-primary-500 to-secondary-500 bg-no-repeat"
                style={{
                  top: "-4px",
                  right: "-5px",
                  bottom: "-4px",
                  left: "-4px",
                }}
              ></span>
              <span
                className="relative z-10 flex items-center justify-center px-5 py-2 sm:py-3 bg-black rounded-full hover:bg-gradient-to-br from-primary-500 to-secondary-500"
                style={{ margin: "2px" }}
                onMouseEnter={() => {
                  const textSpan = document.querySelector(".windows");
                  if (textSpan) {
                    textSpan.classList.remove("text-transparent");
                    textSpan.classList.add("text-black"); 
                  }
                }}
                onMouseLeave={() => {
                  const textSpan = document.querySelector(".windows");
                  if (textSpan) {
                    textSpan.classList.remove("text-black");
                    textSpan.classList.add("text-transparent"); 
                  }
                }}
              >
                <span className="windows block bg-gradient-to-br from-primary-500 to-secondary-700 bg-clip-text text-transparent">
                  Windows
                </span>
              </span>
            </Link>

            <Link
              href="https://macos.raj-datta.com"
              className="relative inline-block text-lg max-w-[200px] rounded-full overflow-hidden"
            >
              <span
                className="absolute z-0 rounded-full border-4 border-transparent bg-gradient-to-br from-primary-500 to-secondary-500 bg-no-repeat"
                style={{
                  top: "-4px",
                  right: "-5px",
                  bottom: "-4px",
                  left: "-4px",
                }}
              ></span>
              <span
                className="relative z-10 flex items-center justify-center px-5 py-2 sm:py-3 bg-black rounded-full hover:bg-gradient-to-br from-primary-500 to-secondary-500"
                style={{ margin: "2px" }}
                onMouseEnter={() => {
                  const textSpan = document.querySelector(".macos");
                  if (textSpan) {
                    textSpan.classList.remove("text-transparent");
                    textSpan.classList.add("text-black");
                  }
                }}
                onMouseLeave={() => {
                  const textSpan = document.querySelector(".macos");
                  if (textSpan) {
                    textSpan.classList.remove("text-black");
                    textSpan.classList.add("text-transparent");
                  }
                }}
              >
                <span className="macos block bg-gradient-to-br from-primary-500 to-secondary-700 bg-clip-text text-transparent">
                  MacOS
                </span>
              </span>
            </Link>

            <Link
              href="https://linux.raj-datta.com"
              className="relative inline-block text-lg max-w-[200px] rounded-full overflow-hidden"
            >
              <span
                className="absolute z-0 rounded-full border-4 border-transparent bg-gradient-to-br from-primary-500 to-secondary-500 bg-no-repeat"
                style={{
                  top: "-4px",
                  right: "-5px",
                  bottom: "-4px",
                  left: "-4px",
                }}
              ></span>
              <span
                className="relative z-10 flex items-center justify-center px-5 py-2 sm:py-3 bg-black rounded-full hover:bg-gradient-to-br from-primary-500 to-secondary-500"
                style={{ margin: "2px" }}
                onMouseEnter={() => {
                  const textSpan = document.querySelector(".linux");
                  if (textSpan) {
                    textSpan.classList.remove("text-transparent"); 
                    textSpan.classList.add("text-black"); 
                  }
                }}
                onMouseLeave={() => {
                  const textSpan = document.querySelector(".linux");
                  if (textSpan) {
                    textSpan.classList.remove("text-black"); 
                    textSpan.classList.add("text-transparent");
                  }
                }}
              >
                <span className="linux block bg-gradient-to-br from-primary-500 to-secondary-700 bg-clip-text text-transparent">
                  Linux
                </span>
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

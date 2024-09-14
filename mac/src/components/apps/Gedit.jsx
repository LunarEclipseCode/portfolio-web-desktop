import React, { Component } from "react";
import $ from "jquery";
import emailjs from "@emailjs/browser";

export class Gedit extends Component {
  constructor() {
    super();
    this.state = {
      sending: false,
      verifying: false,
      verified: false,
      otpSent: false,
      otp: "",
      enteredOtp: "",
      email: "",
      message: "",
      showErrorModal: false,
      showSuccessModal: false,
      errorMessage: "",
      successMessage: "",
      showOtpDialog: false,
      verifiedEmails: JSON.parse(localStorage.getItem("verifiedEmails")) || [],
      otpValid: true,
      timer: 60
    };
    this.timerInterval = null;
  }

  componentDidMount() {
    emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  handleInputChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });

    if (id === "email") {
      const { verifiedEmails } = this.state;
      if (verifiedEmails.includes(value.trim())) {
        this.setState({ verified: true });
      } else {
        this.setState({ verified: false });
      }
    }
  };

  startTimer = () => {
    this.setState({ timer: 60, otpValid: true });
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer > 1) {
          return { timer: prevState.timer - 1 };
        } else {
          clearInterval(this.timerInterval);
          return { otpValid: false, timer: 0 };
        }
      });
    }, 1000);
  };

  sendMessage = async () => {
    const { email, message, verified } = this.state;

    if (email.trim().length === 0 || message.trim().length === 0) {
      this.setState({
        showErrorModal: true,
        errorMessage: "Email and message fields must not be empty!"
      });
      return;
    }

    if (!verified) {
      this.setState({
        showErrorModal: true,
        errorMessage: "You need to verify your email first!"
      });
      return;
    }

    this.setState({ sending: true, showErrorModal: false });

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const templateParams = {
      name: email,
      subject: $("#sender-subject").val().trim(),
      message: message.trim()
    };

    emailjs
      .send(serviceID, templateID, templateParams)
      .then(() => {
        this.setState({
          sending: false,
          showSuccessModal: true,
          successMessage: "Email sent successfully!"
        });
      })
      .catch(() => {
        this.setState({
          sending: false,
          showErrorModal: true,
          errorMessage: "Failed to send message. Please try again."
        });
      });
  };

  sendOtp = () => {
    const { email } = this.state;

    if (email.trim().length === 0) {
      $("#sender-name").val("");
      $("#sender-name").attr("placeholder", "Email must not be Empty!");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.setState({ otp });

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_OTP;
    const templateParams = {
      name: email,
      otp: otp
    };

    emailjs
      .send(serviceID, templateID, templateParams)
      .then(() => {
        this.setState({ otpSent: true, verifying: true, showOtpDialog: true });
        this.startTimer();
      })
      .catch(() => {
        this.setState({
          showErrorModal: true,
          errorMessage: "Failed to send OTP. Please try again.",
          showOtpDialog: false
        });
      });
  };

  verifyOtp = () => {
    if (!this.state.otpValid) {
      this.setState({
        showErrorModal: true,
        errorMessage: "OTP has expired. Please request a new one.",
        showOtpDialog: false
      });
      return;
    }

    if (this.state.enteredOtp === this.state.otp) {
      const { email, verifiedEmails } = this.state;
      if (!verifiedEmails.includes(email.trim())) {
        const updatedVerifiedEmails = [...verifiedEmails, email.trim()];
        this.setState({ verifiedEmails: updatedVerifiedEmails });
        localStorage.setItem("verifiedEmails", JSON.stringify(updatedVerifiedEmails));
      }
      this.setState({
        verified: true,
        verifying: false,
        otpSent: false,
        showSuccessModal: true,
        successMessage: "Email verified successfully!",
        showOtpDialog: false
      });
    } else {
      this.setState({
        showErrorModal: true,
        errorMessage: "Incorrect OTP. Please try again.",
        showOtpDialog: false
      });
    }
  };

  handleOtpChange = (e) => {
    this.setState({ enteredOtp: e.target.value });
  };

  closeErrorModal = () => {
    this.setState({ showErrorModal: false });

    if (this.state.verifying) {
      this.setState({ showOtpDialog: true });
    }
  };

  closeSuccessModal = () => {
    this.setState({ showSuccessModal: false });
  };

  render() {
    const {
      email,
      message,
      showErrorModal,
      errorMessage,
      verified,
      showOtpDialog,
      timer,
      otpValid,
      showSuccessModal,
      successMessage
    } = this.state;
    return (
      <div className="w-full h-full relative flex flex-col bg-[#f0f0f0] text-black dark:bg-[#333333] dark:text-white select-none">
        <div className="flex items-center justify-between w-full bg-[#E5E5E5] border-b border-t border-gray-300 text-sm dark:bg-[#003B70] dark:bg-opacity-60 dark:border-blue-400">
          <span className="font-bold ml-2">Send Me a Message</span>
          <div className="flex ml-8">
            {email.trim().length > 0 && !verified && (
              <div
                onClick={this.sendOtp}
                className="border border-gray-400 bg-gray-200 px-3 py-0.5 my-1 mx-1 rounded hover:bg-gray-300 dark:border-black dark:bg-black dark:bg-opacity-50 dark:hover:bg-black dark:hover:bg-opacity-80"
              >
                Verify Email
              </div>
            )}
            <div
              onClick={this.sendMessage}
              className="border border-gray-400 bg-gray-200 px-3 py-0.5 my-1 mx-1 rounded hover:bg-gray-300 dark:border-black dark:bg-black dark:bg-opacity-50 dark:hover:bg-black dark:hover:bg-opacity-80"
            >
              Send
            </div>
          </div>
        </div>
        <div className="relative flex-grow flex flex-col bg-white font-normal windowMainScreen dark:bg-[#021B33]">
          <div className="relative">
            <input
              id="email"
              value={email}
              onChange={this.handleInputChange}
              className="w-full py-1 text-black focus:bg-gray-100 outline-none font-medium text-sm pl-6 bg-transparent dark:focus:bg-[#003B70] dark:text-white border-b border-gray-300"
              placeholder="Your Email:"
              spellCheck="false"
              autoComplete="off"
              type="text"
            />
          </div>

          <div className="relative">
            <input
              id="sender-subject"
              className="w-full py-1 text-black focus:bg-gray-100 outline-none text-sm font-normal pl-6 bg-transparent dark:focus:bg-[#003B70] dark:text-white border-b border-gray-300"
              placeholder="Subject:"
              spellCheck="false"
              autoComplete="off"
              type="text"
            />
          </div>
          <div className="relative flex-grow">
            <textarea
              id="message"
              value={message}
              onChange={this.handleInputChange}
              className="w-full font-normal text-sm resize-none h-full windowMainScreen outline-none tracking-wider pl-6 py-1 bg-transparent dark:focus:bg-transparent dark:text-white"
              placeholder="Message"
              spellCheck="false"
              autoComplete="none"
              type="text"
            />
          </div>
          <div className="absolute left-0 top-0 h-full px-2 dark:bg-[#010D1A] bg-zinc-300"></div>
        </div>
        {this.state.sending ? (
          <div className="flex justify-center items-center animate-pulse h-full w-full bg-gray-400 bg-opacity-30 absolute top-0 left-0">
            <img
              className={"w-8 absolute animate-spin"}
              src="./themes/Yaru/status/process-working-symbolic.svg"
              alt="Process Symbol"
            />
          </div>
        ) : null}
        {showOtpDialog && !this.state.verified ? (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100 bg-opacity-80 dark:bg-gray-900">
            <div className="bg-white rounded-lg shadow-lg w-max dark:bg-gray-700">
              <div className="bg-gray-300 dark:bg-gray-950 text-black dark:text-white py-1.5 px-3 flex justify-between items-center rounded-t-lg">
                <h2 className="text-black dark:text-white text-md font-semibold">
                  Enter OTP
                </h2>
                <button
                  onClick={() =>
                    this.setState({
                      verifying: false,
                      otpSent: false,
                      showOtpDialog: false
                    })
                  }
                  className="text-black dark:text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  <img
                    class="h-6 w-6"
                    src="./themes/Yaru/window/window-close-symbolic-light.svg"
                  ></img>
                </button>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-b-lg">
                <p className="text-black mb-2 dark:text-white">
                  Please enter the passcode sent to your email.
                  <br />
                  {otpValid ? (
                    <span className="text-red-500 text-md py-4">
                      The passcode is valid for {timer} seconds.
                    </span>
                  ) : (
                    <span className="text-red-500 text-md py-4">
                      The passcode has expired. Please request a new one.
                    </span>
                  )}
                </p>
                <input
                  type="text"
                  value={this.state.enteredOtp}
                  onChange={this.handleOtpChange}
                  className="p-1.5 mb-4 w-full text-black dark:text-white bg-gray-300 dark:bg-gray-900 rounded-md outline-none"
                />
                <div className="flex justify-between">
                  <button
                    onClick={this.sendOtp}
                    className="bg-[#e05221] text-white px-4 py-1.5 rounded hover:bg-opacity-80"
                  >
                    Resend OTP
                  </button>
                  <button
                    onClick={this.verifyOtp}
                    className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-opacity-80"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showErrorModal ? (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100 bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-70">
            <div className="bg-white w-80 rounded-lg shadow-lg dark:bg-gray-900">
              <div className="bg-gray-300 text-black py-1 px-3 flex justify-center rounded-t-lg dark:bg-gray-950 dark:text-white">
                <h2 className="text-black text-md font-semibold dark:text-white">
                  Error
                </h2>
              </div>
              <div className="p-3 dark:bg-gray-800 rounded-b-lg">
                <p className="mb-3 text-black dark:text-white">{errorMessage}</p>
                <div className="flex justify-end">
                  <button
                    onClick={this.closeErrorModal}
                    className="bg-red-500 text-white px-4 py-1 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showSuccessModal ? (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100 dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-70">
            <div className="bg-white dark:bg-gray-800 w-80 rounded-lg shadow-lg">
              <div className="bg-gray-300 dark:bg-gray-950 text-black dark:text-white py-1 px-3 flex justify-center rounded-t-lg">
                <h2 className="text-black text-md font-semibold dark:text-white">
                  Success
                </h2>
              </div>
              <div className="p-3">
                <p className="mb-3 text-black dark:text-white">{successMessage}</p>
                <div className="flex justify-end">
                  <button
                    onClick={this.closeSuccessModal}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md dark:bg-[#e05221]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Gedit;

export const displayGedit = () => {
  return <Gedit></Gedit>;
};

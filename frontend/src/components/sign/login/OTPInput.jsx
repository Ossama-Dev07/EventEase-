import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RecoveryContext } from "../../../main";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ToastContainer, toast } from "react-toastify";

export default function OTPVerification() {
  const { email, otp, setPage } = useContext(RecoveryContext);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState("");
  const [disable, setDisable] = useState(true);
  const notifyerror = (message) => toast.error(message);
  const notifysuccess = (message) => toast.success(message);

  const resendOTP = () => {
    if (disable) return;

    axios
      .post("http://localhost:5000/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
        
      })
      .then(() => {
        setDisable(true);
        setTimer(60);
        notifysuccess("A new OTP has successfully been sent to your email.");
      })
      .catch(console.log);
  };

  const verifyOTP = () => {
    if (parseInt(OTPinput) === otp) {
      setPage("reset");
      return;
    }
    notifyerror(
      "The code you have entered is not correct, try again or re-send the link"
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 1) {
          clearInterval(interval);
          setDisable(false);
        }
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="flex justify-center items-center bg-gray-50 dark:bg-[#020817] ">
      <ToastContainer />
      <div className="bg-white dark:bg-[#091021] px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl text-gray-900 dark:text-white">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400 dark:text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div className="flex flex-col space-y-16">
            <div className="flex justify-center">
              <InputOTP
                maxLength={4}
                value={OTPinput}
                onChange={(value) => setOTPinput(value)}
                className="gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="w-16 h-16 bg-gray-100 dark:bg-[#13203b] text-gray-900 dark:text-white border border-gray-300 dark:border-[#304059] rounded-lg"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-16 h-16 bg-gray-100 dark:bg-[#13203b] text-gray-900 dark:text-white border border-gray-300 dark:border-[#304059] rounded-lg"
                  />
                  <InputOTPSlot
                    index={2}
                    className="w-16 h-16 bg-gray-100 dark:bg-[#13203b] text-gray-900 dark:text-white border border-gray-300 dark:border-[#304059] rounded-lg"
                  />
                  <InputOTPSlot
                    index={3}
                    className="w-16 h-16 bg-gray-100 dark:bg-[#13203b] text-gray-900 dark:text-white border border-gray-300 dark:border-[#304059] rounded-lg"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex flex-col space-y-5">
              <button
                onClick={verifyOTP}
                className="flex items-center justify-center w-full py-5 text-sm text-white bg-blue-700 rounded-xl hover:bg-blue-800 dark:bg-[#2462e0] dark:hover:bg-[#1e54c2] transition-colors"
              >
                Verify Account
              </button>

              <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <p>Didn't receive code?</p>
                <button
                  className={`${
                    disable
                      ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      : "text-blue-700 dark:text-[#3a84ff] hover:underline cursor-pointer"
                  }`}
                  onClick={resendOTP}
                  disabled={disable}
                >
                  {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

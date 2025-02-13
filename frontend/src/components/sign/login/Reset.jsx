import React, { useContext, useState } from "react";
import { RecoveryContext } from "../../../main";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Reset() {
  const { setPage, email } = useContext(RecoveryContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const notifysuccess = (message) => toast.success(message);
  const notifyerror = (message) => toast.error(message);

  function changePassword() {
    if (!password || !confirmPassword) {
      notifyerror("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      notifyerror("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      notifyerror("Please accept the Terms and Conditions");
      return;
    }
    

    axios
      .post("http://localhost:30084/reset_password", {
        recipient_email: email,
        newpassword: confirmPassword,
      })
      .then(() => {
        notifysuccess("password changed successfully");
        setPage("login");
      })
      .catch((error) => notifyerror(error));
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-[#020817]">
      <ToastContainer />
      <div className="bg-white dark:bg-[#091021] px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl text-gray-900 dark:text-white">
              <p>Change Password</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400 dark:text-gray-400">
              <p>Enter your new password below</p>
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#304059] text-lg bg-white dark:bg-[#13203b] text-gray-900 dark:text-white focus:bg-gray-50 dark:focus:bg-[#1b2a41] focus:ring-1 ring-blue-700 outline-none pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#304059] text-lg bg-white dark:bg-[#13203b] text-gray-900 dark:text-white focus:bg-gray-50 dark:focus:bg-[#1b2a41] focus:ring-1 ring-blue-700 outline-none pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 border-gray-300 rounded text-blue-700 dark:text-blue-500 dark:border-[#304059] focus:ring-blue-700"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  I accept the{" "}
                  <a
                    href="#"
                    className="text-blue-700 dark:text-[#3a84ff] hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <button
              onClick={changePassword}
              className="w-full py-5 text-sm font-medium text-white bg-blue-700 dark:bg-[#2462e0] rounded-xl hover:bg-blue-800 dark:hover:bg-[#1e54c2] transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

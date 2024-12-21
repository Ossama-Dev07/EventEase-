import React, { useContext, useState } from 'react';
import { RecoveryContext } from "../../../main";
import { Eye, EyeOff } from "lucide-react";

export default function Reset() {
  const { setPage } = useContext(RecoveryContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function changePassword() {
    if (!password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      alert('Please accept the Terms and Conditions');
      return;
    }

    setPage("recovered");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Change Password</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Enter your new password below</p>
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 outline-none pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? 
                      <EyeOff className="w-5 h-5" /> : 
                      <Eye className="w-5 h-5" />
                    }
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 outline-none pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? 
                      <EyeOff className="w-5 h-5" /> : 
                      <Eye className="w-5 h-5" />
                    }
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 border-gray-300 rounded text-blue-700 focus:ring-blue-700"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I accept the{" "}
                  <a
                    href="#"
                    className="text-blue-700 hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <button
              onClick={changePassword}
              className="w-full py-5 text-sm font-medium text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
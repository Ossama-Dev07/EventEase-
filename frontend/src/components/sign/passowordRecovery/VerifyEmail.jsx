import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RecoveryContext } from "../../../main";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function VerifyEmail() {
  const [emailInput, setEmailInput] = useState(""); // Correct usage of useState
  const { setEmail, setPage, setOTP } = useContext(RecoveryContext);

  function navigateToOtp(e) {
    e.preventDefault(); // Prevent form submission from reloading the page

    if (emailInput) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log("OTP", OTP);
      setOTP(OTP);

      axios
        .post("http://localhost:30084/send_recovery_email", {
          OTP,
          recipient_email: emailInput,
        })
        .then(() => {
          setEmail(emailInput); // Save the email in context
          setPage("otp"); // Navigate to the OTP page
        })
        .catch((error) =>
          toast.error(error.response?.data || "An error occurred")
        );
    } else {
      toast.error("Please enter your email");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={navigateToOtp}>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter your email and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </CardContent>
          <CardContent className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => setPage("login")}
            >
              Back to Login
            </Button>
            <Button type="submit" className="bg-[#1565c0] hover:bg-[#0e4e97]">
              Send code
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

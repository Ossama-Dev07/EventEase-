import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, Route, useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { RecoveryContext } from "../../../main";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export function Login() {
  const [seepwd, setSeepwd] = useState(false);
  const navigate = useNavigate();
  const { login, error, isLoading } = useAuthStore();
  const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);
  
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(values);
      navigate("/");
    } catch (err) {
      
      console.error("Login error", err);
    }
  };

  return (
    <Card className="lg:min-h-[300px]  xl:min-h-[500px]">
     <ToastContainer />
      <CardHeader>
        <CardTitle className="text-2xl text-[#1565c0]">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  to="/recoveryPassword"
                  onClick={() => setPage("verifyEmail")}
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type={seepwd ? "text" : "password"}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" onClick={() => setSeepwd(!seepwd)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none"
              >
                See password
              </label>
            </div>
            {error && <span className="ml-4 text-red-500">*{error}</span>}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1565c0] hover:bg-[#0e4e97]"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <button
            className="underline"
            onClick={() =>
              navigate("/signcard", {
                state: { type: "signup" },
                replace: false,
              })
            }
          >
            Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Login;

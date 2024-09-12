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
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [seepwd, setSeepwd] = useState(false);
  const [error, setError] = useState();
  const navigat = useNavigate()
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const Handlsubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:30084/login", values)
      .then((res) => {console.log(res.data)
      navigat("/")})
      .catch((res) => setError(res.response.data.message));
    
    
  };
  return (
    <Card className="lg:min-h-[300px]  xl:min-h-[500px]">
      <CardHeader>
        <CardTitle className="text-2xl text-[#1565c0]">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action="" onSubmit={Handlsubmit}>
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
                <a href="#" className="ml-auto inline-block text-sm underline">
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
              className="w-full bg-[#1565c0] hover:bg-[#0e4e97]"
            >
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
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
import axios from "axios";

export function Signup() {
  const [seepwd, setSeepwd] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error message
  const [success, setSuccess] = useState(""); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await axios
        .post("http://localhost:30084/signup", values)
        .then((res) => {
          setError(res.data.error);
          
        })
        .catch((res) => {
          console.log(res);
          
        });
    
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Robinson"
                required
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
              />
            </div>
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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                placeholder="+212....."
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={seepwd ? "text" : "password"}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
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
            <Button type="submit" className="w-full">
              Create an account
            </Button>
            {error && <div className="mt-4 text-red-500">{error}</div>}
            {success && <div className="mt-4 text-green-500">{success}</div>}
          </div>
        </form>
        <Button variant="outline" className="w-full">
          Sign up with GitHub
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="#" className="underline">
            Sign in
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default Signup;

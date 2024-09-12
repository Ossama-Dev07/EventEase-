import React, { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";

function SideBar() {
  const navigat = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const [data, setData] = useState();
  axios.defaults.withCredentials = true;
  const hanldSignup = (e, value) => {
  
    navigat("/signcard", {
      state: { type: "signup" },
      replace: false,
    });
  };
  const hanldLogin = () => {
    navigat("/signcard", {
      state: { type: "login" },
      replace: false,
    });
  }

  useEffect(() => {
    axios
      .get("http://localhost:30084/user")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));

    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/event" className="flex items-center">
          Events
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/about" className="flex items-center">
          About Us
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/contact" className="flex items-center">
          Contact Us
        </Link>
      </Typography>
    </ul>
  );

  const userAvatar = (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );

  const loginButtons = (
    <div className="flex items-center gap-x-1">
      <Button
        variant="text"
        size="sm"
        className="hidden lg:inline-block"
        onClick={hanldLogin}
      >
        <span>Log In</span>
      </Button>
      <Button
        variant="gradient"
        size="sm"
        className="hidden lg:inline-block"
        onClick={hanldSignup}
      >
        <span>Sing up</span>
      </Button>
    </div>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link
          as="Link"
          to="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          EventEase
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden lg:block">
          {data && data.valid ? userAvatar : loginButtons}
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          {data && data.valid ? (
            userAvatar
          ) : (
            <div className="flex items-center gap-x-1">
              <Button
                fullWidth
                variant="text"
                size="sm"
                className=""
                onClick={hanldLogin}
              >
                <span>Log In</span>
              </Button>
              <Button
                fullWidth
                variant="gradient"
                size="sm"
                className=""
                onClick={hanldSignup}
              >
                <span>Sign Up</span>
              </Button>
            </div>
          )}
        </div>
      </MobileNav>
    </Navbar>
  );
}

export default SideBar;

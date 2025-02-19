import React, { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import Menu from "./Profile/Menu";
import logoL from "../assets/logoL.png";
import logoD from "../assets/logoD.png";

import { Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
function SideBar() {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [openNav, setOpenNav] = useState(false);
  const [userData, setUserData] = useState();
  const [logged, setLogged] = useState();
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  axios.defaults.withCredentials = true;
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSignup = () => {
    navigate("/signcard", {
      state: { type: "signup" },
      replace: false,
    });
  };

  const handleLogin = () => {
    navigate("/signcard", {
      state: { type: "login" },
      replace: false,
    });
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:30084/user");
      setUserData(res.data.user);
      setLogged(res.data.valid);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();

    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItemClasses = (path) => {
    return `
      relative 
      hover:text-blue-500
      transition-colors 
      duration-300 
      py-1.5
      ${currentPath === path ? "text-blue-500 after:w-full" : "after:w-0"}
      after:content-['']
      after:absolute
      after:bottom-0
      after:left-0
      after:h-[2px]
      after:bg-blue-500
      after:transition-all
      after:duration-300
      after:w-0
      hover:after:w-full
    `;
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`flex items-center gap-x-2 p-1 font-medium ${
          theme === "light" ? "text-black" : "text-gray-200"
        }`}
      >
        <Link to="/" className={navItemClasses("/")}>
          Home
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`flex items-center gap-x-2 p-1 font-medium ${
          theme === "light" ? "text-black" : "text-gray-200"
        }`}
      >
        <Link to="/event" className={navItemClasses("/event")}>
          Events
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`flex items-center gap-x-2 p-1 font-medium ${
          theme === "light" ? "text-black" : "text-gray-200"
        }`}
      >
        <Link to="/about" className={navItemClasses("/about")}>
          About Us
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`flex items-center gap-x-2 p-1 font-medium ${
          theme === "light" ? "text-black" : "text-gray-200"
        }`}
      >
        <Link to="/contact" className={navItemClasses("/contact")}>
          Contact Us
        </Link>
      </Typography>
    </ul>
  );

  const userAvatar = <Menu userData={userData} />;

  const loginButtons = (
    <div className="flex items-center gap-x-1">
      <Button
        variant="text"
        size="sm"
        className={`lg:inline-block ${
          theme === "light" ? "text-black" : "text-gray-100"
        }`}
        onClick={handleLogin}
      >
        <span>Log In</span>
      </Button>
      <Button
        size="sm"
        className={`lg:inline-block bg-blue-500 `}
        onClick={handleSignup}
      >
        <span>Sign up</span>
      </Button>
    </div>
  );
  const renderAuthSection = () => {
    if (loading) {
      return (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-[150px]" />
            <Skeleton className="h-3 w-[150px]" />
          </div>
        </div>
      );
    }
    return userData && logged ? userAvatar : loginButtons;
  };

  return (
    <Navbar className="fixed top-0 z-50 w-full border-transparent bg-inherit max-w-screen-3xl px-4 py-2 lg:px-6 lg:py-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="mr-4 cursor-pointer text-lg flex items-center">
          <img
            src={theme === "light" ? logoL : logoD}
            width="60px"
            className="object-cover"
          />
          <div
            className={`ml-2 ${
              theme === "light" ? "text-black" : "text-gray-100"
            }`}
          >
            <span className="text-blue-500">E</span>vent
            <span className="text-blue-500">E</span>ase
          </div>
        </Link>

        <div className="hidden lg:block">{navList}</div>
        <div className="hidden lg:block">{renderAuthSection()}</div>
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
              stroke={`${theme === "light" ? "black" : "white"}`}
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
              className="h-6 w-6 "
              fill="none"
              stroke={`${theme === "light" ? "black" : "white"}`}
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
        <Button
          size="icon"
          onClick={toggleTheme}
          className="relative rounded-full h-11 w-11 p-2 bg-[#000826] dark:bg-white"
        >
          <Sun className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:fill-blue-400" />

          <Moon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

          {/* Screen reader text */}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          {renderAuthSection()}
        </div>
      </MobileNav>
    </Navbar>
  );
}

export default SideBar;

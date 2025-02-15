import {
  LifeBuoy,
  LogOut,
  ShoppingCart,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { Avatar } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Profile from "./Profile";
import { useState } from "react";

export default function Menu(userData) {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const handleLogout = async () => {
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.post("http://localhost:30084/logout");
      if (res.status === 200) {
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const { theme } = useTheme();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="border-none p-6 bg-inherit">
          <Button variant="outline">
            <div className="flex items-center gap-4">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                className="h-10 w-10"
              />
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[280px]">
          <div className="flex items-center gap-3 ">
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              className="h-10 w-10"
            />
            <div className="flex flex-col items-start">
              <Typography
                variant="h6"
                color={`${theme === "light" ? "black" : "white"}`}
              >
                {userData.userData?.username}
              </Typography>
              <Typography
                variant="small"
                color={`${theme === "light" ? "gray" : "white"}`}
                className="font-normal"
              >
                {userData.userData?.email}
              </Typography>
            </div>
          </div>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpenProfile(true)}>
              {" "}
              {/* Control sheet open */}
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Tickets</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sheet for Profile */}
      <div />
      <Sheet open={openProfile} onOpenChange={setOpenProfile}>
        <SheetTrigger asChild></SheetTrigger>
        <SheetContent>
          <Profile User={userData} />
        </SheetContent>
      </Sheet>
    </>
  );
}

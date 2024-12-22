// Signcard.jsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Login } from "./login/Login";
import Signup from "./signup/Signup";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { RecoveryContext } from "../../main"; 
import OTPInput from "./login/OTPInput";
import Reset from "./login/Reset";
import Recovered from "./login/Recovered";

export function Signcard() {
  const location = useLocation();
  const { type } = location.state || {};
  const [activeTab, setActiveTab] = useState(type || "login");
  const { page } = useContext(RecoveryContext);

  useEffect(() => {
    if (type) {
      setActiveTab(type);
    } else {
      setActiveTab("login");
    }
  }, [type]);

  // Recovery flow component
  function RecoveryComponents() {
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <Reset />;
    if (page === "recovered") return <Recovered />;
    return null;
  }
  

  return (
    <div className="w-full lg:grid lg:min-h-[500px] lg:grid-cols-2 xl:min-h-[700px]">
      <div className="flex items-center justify-center">
        {page === "login" ? (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="font-bold text-[#1565c0]">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="font-bold text-[#1565c0]">
                Signup
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Login />
            </TabsContent>
            <TabsContent value="signup">
              <Signup />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="w-[400px]">
            <RecoveryComponents />
          </div>
        )}
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="./Image.png"
          alt="Image"
          className="w-full h-full object-cover "
        />
      </div>
    </div>
  );
}

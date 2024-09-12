
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Login } from "./Login";
import Signup from "./Signup";
import { useLocation } from "react-router-dom";



export function Signcard() {
  const location = useLocation()
  const { type } = location.state || {};
  
  return (
    <div className="w-full lg:grid lg:min-h-[500px] lg:grid-cols-2 xl:min-h-[700px] ">
      <div className="flex items-center justify-center">
        <Tabs defaultValue={type} className="w-[400px] ">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="font-bold text-[#1565c0]">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="font-bold text-[#1565c0] ">
              Signup
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" >
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="./Image.png"
          alt="Image"
          className="w-full h-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

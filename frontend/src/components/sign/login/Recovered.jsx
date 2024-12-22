import React from "react";
import { useTheme } from "@/components/theme-provider";
import logoL from "../../../assets/logoL.png";
import logoD from "../../../assets/logoD.png";
import { useNavigate } from "react-router-dom";

export default function Recovered() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  return (
    <div>
      <section class="h-screen">
        <div class="px-6 h-full text-gray-800">
          <div class="flex flex-col	 justify-center items-center gap-20">
            <div class="flex justify-center items-center ">
              <img
                width="100px"
                src={theme === "light" ? logoL : logoD}
                className="object-cover"
                alt="Sample image"
              />
              <div
                className={`text-3xl  ${
                  theme === "light" ? "text-black" : "text-gray-100"
                }`}
              >
                <span className="text-blue-500">E</span>vent
                <span className="text-blue-500">E</span>ase
              </div>
            </div>
            <div class="">
              <form>
                <div class="flex flex-row items-center justify-center lg:justify-start">
                  <h1 class="text-2xl font-bold mb-0 mr-4">
                    Password succesfully set{" "}
                  </h1>
                </div>

                <div class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <button
                    className="underline"
                    onClick={() =>
                      navigate("/login", {
                        state: { type: "login" },
                        replace: false,
                      })
                    }
                  >
                    Go back LOGIN{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import React from "react";
import Navbar from "./Navbar";
import { useTheme } from "../hooks/themeHooks";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme();
    return (
        <div className="flex items-start w-full min-h-screen overflow-hidden">
            <Navbar />

            <main className={`${theme === "dark" ? "bg-[#0D0D0D]" : "bg-white"} flex-wrap grow flex flex-col items-center  w-full`}>
                {children}
            </main>
        </div>
    );
};

export default LayoutProvider;
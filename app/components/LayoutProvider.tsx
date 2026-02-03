import React from "react";
import Navbar from "./Navbar";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-start w-full min-h-screen overflow-hidden">
            <Navbar />

            <main className="flex-wrap grow flex flex-col items-center  w-full">
                {children}
            </main>
        </div>
    );
};

export default LayoutProvider;
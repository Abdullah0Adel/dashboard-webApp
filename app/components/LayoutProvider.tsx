import React from "react";
import Navbar from "./Navbar";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-start w-full min-h-screen overflow-hidden">
            <Navbar />
            {children}
        </div>
    );
};

export default LayoutProvider;
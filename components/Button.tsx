"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ModeToggle } from "./theme";

const Button: React.FC = () => {
    return (
        <div className="absolute top-6 right-6 flex items-center space-x-6">
            <ConnectButton />
            <ModeToggle />
        </div>
    );
};

export default Button;

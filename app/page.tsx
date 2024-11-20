"use client";

import WalletProvider from "../components/wallet-providers";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { Sidebar } from "@/components/Sidebar";
import Button from "@/components/Button";
import { MintCard } from "@/components/MintCard";
import { ToggleMintRepay } from "@/components/ToggleMintRepay";

export default function Home() {
    return (
        <WalletProvider>
            <Button />
            <div>
                <ToggleMintRepay />
            </div>
        </WalletProvider>
    );
}
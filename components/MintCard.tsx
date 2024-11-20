"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWriteContract, useAccount, useReadContract } from "wagmi";
import { useState, useEffect } from "react";
import { formatUnits } from "ethers";

const ABI = [{ "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "address", "name": "_collateralAsset", "type": "address" }, { "internalType": "address", "name": "_oracle", "type": "address" }, { "internalType": "address", "name": "_TUSD", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "Borrowed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_withdrawnCollateral", "type": "uint256" }], "name": "Repaid", "type": "event" }, { "inputs": [], "name": "TUSD", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "admin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_collateralToDeposit", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "borrow", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "borrowedAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "borrowedTUSD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "collateralAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "collateralAsset", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "depositCollateral", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "feeAccrued", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "oracle", "outputs": [{ "internalType": "contract ChainlinkOracle", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "pendingReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "uint256", "name": "_collateralToWithdraw", "type": "uint256" }], "name": "repay", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_admin", "type": "address" }], "name": "setAdmin", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }], "name": "setOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "stake", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "suppliedTUSD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "supplyTUSD", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdrawCollateral", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdrawTUSD", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const contract = "0xa3283087A4f9a48d276bB54A0117978d48822378";

const erc20ABI = [{ "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "uint256", "name": "_initialSupply", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
const tBTC = "0x3b7965186987Fb1F59Ced635b1043B09Bdfc624a";
const tUSD = "0x9213ed55bcCB2F5a63e740De785629a1e35fbFC7";

export function MintCard() {

    const { address } = useAccount();
    const { writeContract } = useWriteContract();
    const [collateralInput, setCollateralInput] = useState("");
    const [amountInput, setAmountInput] = useState("");
    const [globalCollateral, setGlobalCollateral] = useState("");
    const [tUSDSupply, settUSDSupply] = useState("");
    const [cf, setCF] = useState("");

    const { data: globaltBTCBalance } = useReadContract({
        address: tBTC,
        abi: erc20ABI,
        functionName: "balanceOf",
        args: [contract],
    });

    const { data: supply } = useReadContract({
        address: contract,
        abi: ABI,
        functionName: "borrowedTUSD",
        args: [],
    });

    const { data: collateralFactor } = useReadContract({
        address: contract,
        abi: ABI,
        functionName: "getPrice",
        args: [],
    });

    const { data: tBTCBalance } = useReadContract({
        address: tBTC,
        abi: erc20ABI,
        functionName: "balanceOf",
        args: [address],
    });

    const { data: tUSDBalance } = useReadContract({
        address: tUSD,
        abi: erc20ABI,
        functionName: "balanceOf",
        args: [address],
    });

    async function Mint(collateralToDeposit: Number, amountToMint: Number) {
        await writeContract({
            address: contract,
            abi: ABI,
            functionName: "borrow",
            args: [collateralToDeposit, amountToMint]
        });
    }

    useEffect(() => {
        if (globaltBTCBalance) {
            setGlobalCollateral(globaltBTCBalance.toString());
        }
    }, [globaltBTCBalance]);

    useEffect(() => {
        if (supply) {
            settUSDSupply(supply.toString());
        }
    }, [supply]);

    useEffect(() => {
        if (collateralFactor) {
            let cf = Number(collateralFactor) * Number(globaltBTCBalance) / Number(supply) * 100
            setCF(cf.toString());
        }
    }, [collateralFactor]);

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="border border-border p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-4xl font-bold text-center mb-6">Mint</h1>

                <div className="flex flex-col gap-2 text-sm mb-6">
                    <div className="flex justify-between">
                        <span className="font-semibold">Collateral:</span>
                        <span>{globalCollateral ? formatUnits(globalCollateral, 18) : "0.00" } tBTC</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">tUSD Supply:</span>
                        <span>{tUSDSupply ? formatUnits(tUSDSupply, 18) : "0.00"} tUSD</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Collateral Ratio:</span>
                        <span>{cf}%</span>
                    </div>
                    {/* <div className="flex justify-between">
                        <span className="font-semibold">User Minted:</span>
                        <span>0</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Health Factor:</span>
                        <span>0</span>
                    </div> */}
                </div>

                <div className="mb-4 h1">
                    Input Collateral
                </div>

                <div className="relative mb-4">
                    <Input
                        placeholder="Enter amount"
                        value={collateralInput}
                        onChange={(e) => setCollateralInput(e.target.value)}
                        className="w-full pr-16"
                    />
                    <Button
                        variant="ghost"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm"
                        onClick={() => setCollateralInput(tBTCBalance?.toString() || "")}
                    >
                        Max
                    </Button>
                </div>

                {/* <div className="flex justify-center mb-6">
                    <Button className="px-6 py-2">Deposit Collateral</Button>
                </div> */}

                <div className="relative mb-4">
                    <Input
                        placeholder="Enter amount"
                        value={amountInput}
                        onChange={(e) => setAmountInput(e.target.value)}
                        className="w-full pr-16"
                    />
                    <Button
                        variant="ghost"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm"
                        onClick={() => setAmountInput(tUSDBalance?.toString() || "")}
                    >
                        Max
                    </Button>
                </div>

                <div className="flex justify-center">
                    <Button
                        className="px-6 py-2"
                        onClick={() => Mint(Number(collateralInput), Number(amountInput))}
                    >
                        Mint tUSD
                    </Button>
                </div>
            </div>
        </div>
    );
}

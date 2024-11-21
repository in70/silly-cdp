"use client"
import { Button } from "@/components/ui/button";
import { useWriteContract } from "wagmi";

const ABI = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"_initialSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintTest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
const contract = "0x35bec5521b943205ba363bf7cb8c4b1eeef833f4";
const mintContract = "0x8a0005F0da67f425AdDB6C2e9FdB0EeF8BA02788";

export function GettBTC() {

    const { writeContract } = useWriteContract();

    async function minttBTC() {
        await writeContract({
            address: contract,
            abi: ABI,
            functionName: "mintTest",
            args: []
        });
    }

    async function approve() {
        await writeContract({
            address: contract,
            abi: ABI,
            functionName: "approve",
            args: [mintContract, "10000000000000000000000000000000"]
        });
    }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border border-border p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6">Get Test Tokens</h1>

        {/* <div className="relative mb-4">
          <Input
            placeholder="Enter amount"
            className="w-full pr-16"
          />
          <Button
            variant="ghost"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm"
          >
            Maxeee
          </Button>
        </div> */}

        <div className="flex justify-center">
          <Button className="px-6 py-2" onClick={() => {minttBTC()}}>Mint 10 tBTC</Button>
        </div>

        <div className="flex justify-center mt-4">
          <Button className="px-6 py-2" onClick={() => {approve()}}>Approve tBTC</Button>
        </div>
      </div>
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RepayCard() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border border-border p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6">Repay</h1>

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
          <Button className="px-6 py-2">Withdraw</Button>
        </div>
      </div>
    </div>
  );
}

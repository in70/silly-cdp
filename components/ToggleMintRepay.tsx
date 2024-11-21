import { useState } from "react";
import { MintCard } from "./MintCard";
import { GettBTC } from "./GettBTC";

export function ToggleMintRepay() {
    const [isMint, setIsMint] = useState(true);
    const [fade, setFade] = useState(false);

    const handleToggle = () => {
        setFade(true);
        setTimeout(() => {
            setIsMint(!isMint);
            setFade(false);
        }, 200);
    };

    return (
        <div className="h-screen flex flex-col items-center">
            <div className="absolute top-4">
                <div className="relative w-40 h-10 bg-muted rounded-full flex items-center justify-between p-1 shadow-md">
                    <button
                        className={`w-1/2 h-full rounded-full transition-all ${isMint
                                ? "bg-muted-foreground text-background"
                                : "text-muted-foreground"
                            } flex items-center justify-center`}
                        onClick={handleToggle}
                    >
                        Mint
                    </button>
                    <button
                        className={`w-1/2 h-full rounded-full transition-all ${!isMint
                                ? "bg-muted-foreground text-background"
                                : "text-muted-foreground"
                            } flex items-center justify-center`}
                        onClick={handleToggle}
                    >
                        Get tBTC
                    </button>
                </div>
            </div>

            <div
                className={`flex-grow flex items-center justify-center transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100"
                    }`}
            >
                {isMint ? <MintCard /> : <GettBTC />}
            </div>
        </div>
    );
}

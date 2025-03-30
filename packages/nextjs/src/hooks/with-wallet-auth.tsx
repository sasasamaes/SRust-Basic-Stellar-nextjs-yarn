"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWalletStore } from "@/store/use-wallet-store";
import { Loader2 } from "lucide-react";
import { WalletAuthPrompt } from "./with-wallet-prompt";

export function withWalletAuth(Component: React.ComponentType) {
    return function AuthenticatedComponent(props: any) {
        const router = useRouter();
        const { publicKey, connect, connecting } = useWalletStore();
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const checkWalletConnection = async () => {
                try {
                    if (!publicKey) {
                        await connect();
                    }
                } catch (error) {
                    console.error("Error checking wallet connection:", error);
                } finally {
                    setIsLoading(false);
                }
            };

            checkWalletConnection();
        }, [publicKey, connect]);

        if (isLoading || connecting) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <Loader2 className="h-8 w-8 animate-spin mb-4" />
                    <p>Checking wallet connection...</p>
                </div>
            );
        }

        if (!publicKey) {
            return <WalletAuthPrompt />;
        }

        return <Component {...props} />;
    };
}
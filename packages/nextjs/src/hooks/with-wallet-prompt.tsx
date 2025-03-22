"use client"
import { useWalletStore } from "@/store/use-wallet-store";
import { Loader2 } from "lucide-react";

export function WalletAuthPrompt() {
    const { connect, connecting } = useWalletStore();
  
    const handleConnect = async () => {
      try {
        await connect();
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Authentication Required</h1>
          <p className="mb-6 text-gray-600 text-center">
            You need to connect your wallet to access this page.
          </p>
          <button
            onClick={handleConnect}
            disabled={connecting}
            className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-50"
          >
            {connecting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </span>
            ) : (
              "Connect Wallet"
            )}
          </button>
        </div>
      </div>
    );
  }
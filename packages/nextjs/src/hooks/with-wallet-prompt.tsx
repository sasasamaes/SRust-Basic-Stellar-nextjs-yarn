"use client"
import { useWalletStore } from "@/store/use-wallet-store";
import { Loader2, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function WalletAuthPrompt() {
  const { connect, connecting, isConnected, publicKey } = useWalletStore();
  const [isChecking, setIsChecking] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (isConnected && publicKey) {
          toast.success("Wallet Reconnected", {
            description: "Welcome back!",
          });
          setTimeout(() => {
            setSuccess(true);
          }, 1500);
        }
      } catch (error) {
        console.log("No wallet connected.", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkConnection();
  }, [isConnected, publicKey]);

  const handleConnect = async () => {
    try {
      await connect();
      
      if (isConnected && publicKey) {
        toast.success("Wallet Connected", {
          description: "Successfully connected to wallet",
        });
        
        setSuccess(true);
        setTimeout(() => {
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast.error("Connection Failed", {
        description: "Failed to connect to wallet.",
      });
    }
  };

  if (success) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Authentication Required</h1>
        <p className="mb-6 text-gray-600 text-center">
          You need to connect your wallet to access this page.
        </p>
        <button
          onClick={handleConnect}
          disabled={connecting || isChecking}
          className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-50"
        >
          {isChecking ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </span>
          ) : connecting ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </span>
          ) : success ? (
            <span className="flex items-center justify-center">
              <Check className="mr-2 h-4 w-4" />
              Connected!
            </span>
          ) : (
            "Connect Wallet"
          )}
        </button>
      </div>
    </div>
  );
}
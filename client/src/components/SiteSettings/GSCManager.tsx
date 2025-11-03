"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGSCConnection, useConnectGSC, useDisconnectGSC } from "@/api/gsc/useGSCConnection";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface GSCManagerProps {
  siteId: number;
  disabled?: boolean;
}

export function GSCManager({ siteId, disabled = false }: GSCManagerProps) {
  const { site } = useStore();
  const searchParams = useSearchParams();
  const { data: connection, isLoading, refetch } = useGSCConnection();
  const { mutate: connect, isPending: isConnecting } = useConnectGSC();
  const { mutate: disconnect, isPending: isDisconnecting } = useDisconnectGSC();

  // Check for OAuth success/error in URL params
  useEffect(() => {
    const gscStatus = searchParams.get("gsc");
    if (gscStatus === "success") {
      toast.success("Google Search Console connected successfully");
      refetch();
    }
  }, [searchParams, refetch]);

  const handleDisconnect = async () => {
    disconnect(undefined, {
      onSuccess: () => {
        toast.success("Google Search Console disconnected");
      },
      onError: () => {
        toast.error("Failed to disconnect Google Search Console");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Google Search Console</h4>
          <p className="text-xs text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const isConnected = connection?.connected;

  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-semibold text-foreground">Google Search Console</h4>
        <p className="text-xs text-muted-foreground">
          Connect your Google Search Console account to view search performance data
        </p>
      </div>

      {isConnected ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500">●</span>
            <span className="text-muted-foreground">Connected to:</span>
            <a
              href={connection.gscPropertyUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline flex items-center gap-1"
            >
              {connection.gscPropertyUrl}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" disabled={disabled || isDisconnecting} className="w-full">
                {isDisconnecting ? "Disconnecting..." : "Disconnect"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Disconnect Google Search Console?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove the connection to Google Search Console. You can reconnect at any time.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDisconnect}>Disconnect</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <Button onClick={() => connect()} disabled={disabled || isConnecting} className="w-full">
          {isConnecting ? "Connecting..." : "Connect Google Search Console"}
        </Button>
      )}
    </div>
  );
}

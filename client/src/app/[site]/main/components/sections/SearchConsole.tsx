import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/basic-tabs";
import { Card, CardContent, CardLoader } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { useGSCConnection, useConnectGSC } from "../../../../../api/gsc/useGSCConnection";
import { useGSCQueries } from "../../../../../api/gsc/useGSCQueries";
import { useGSCPages } from "../../../../../api/gsc/useGSCPages";
import { ExternalLink } from "lucide-react";

type Tab = "queries" | "pages";

function ConnectPrompt() {
  const { mutate: connect, isPending } = useConnectGSC();

  return (
    <div className="flex flex-col items-center justify-center h-[344px] gap-4">
      <div className="text-sm text-neutral-400 text-center max-w-sm">
        Connect your Google Search Console account to view search performance data including top keywords and pages.
      </div>
      <Button onClick={() => connect()} disabled={isPending}>
        {isPending ? "Connecting..." : "Connect Google Search Console"}
      </Button>
    </div>
  );
}

function QueriesList() {
  const { data: queries, isLoading } = useGSCQueries();

  return (
    <>
      {isLoading && (
        <div className="absolute top-[-8px] left-0 w-full h-full">
          <CardLoader />
        </div>
      )}
      <div className="relative max-h-[344px] overflow-y-auto">
        <div className="flex flex-row gap-2 justify-between pr-1 text-xs text-neutral-400 mb-2">
          <div className="flex-1">Keyword</div>
          <div className="w-20 text-right">Clicks</div>
          <div className="w-24 text-right">Impressions</div>
        </div>
        {queries && queries.length > 0 ? (
          <div className="space-y-1">
            {queries.slice(0, 10).map((query, index) => (
              <div
                key={index}
                className="flex flex-row gap-2 justify-between pr-1 text-sm py-1 hover:bg-neutral-800/30 rounded px-1"
              >
                <div className="flex-1 truncate">{query.query}</div>
                <div className="w-20 text-right text-neutral-300">{query.clicks.toLocaleString()}</div>
                <div className="w-24 text-right text-neutral-400">{query.impressions.toLocaleString()}</div>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="text-sm text-neutral-500 text-center mt-20">
              No search query data available for the selected date range
            </div>
          )
        )}
      </div>
    </>
  );
}

function PagesList() {
  const { data: pages, isLoading } = useGSCPages();

  return (
    <>
      {isLoading && (
        <div className="absolute top-[-8px] left-0 w-full h-full">
          <CardLoader />
        </div>
      )}
      <div className="relative max-h-[344px] overflow-y-auto">
        <div className="flex flex-row gap-2 justify-between pr-1 text-xs text-neutral-400 mb-2">
          <div className="flex-1">Page</div>
          <div className="w-20 text-right">Clicks</div>
          <div className="w-24 text-right">Impressions</div>
        </div>
        {pages && pages.length > 0 ? (
          <div className="space-y-1">
            {pages.slice(0, 10).map((page, index) => (
              <div
                key={index}
                className="flex flex-row gap-2 justify-between pr-1 text-sm py-1 hover:bg-neutral-800/30 rounded px-1"
              >
                <div className="flex-1 truncate flex items-center gap-1">
                  <span className="truncate">{new URL(page.page).pathname || "/"}</span>
                  <a href={page.page} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-300">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="w-20 text-right text-neutral-300">{page.clicks.toLocaleString()}</div>
                <div className="w-24 text-right text-neutral-400">{page.impressions.toLocaleString()}</div>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="text-sm text-neutral-500 text-center mt-20">
              No page data available for the selected date range
            </div>
          )
        )}
      </div>
    </>
  );
}

export function SearchConsole() {
  const [tab, setTab] = useState<Tab>("queries");
  const { data: connection, isLoading: isLoadingConnection } = useGSCConnection();

  if (isLoadingConnection) {
    return (
      <Card className="h-[405px]">
        <CardContent className="mt-2">
          <CardLoader />
        </CardContent>
      </Card>
    );
  }

  const isConnected = connection?.connected;

  return (
    <Card className="h-[405px]">
      <CardContent className="mt-2">
        {!isConnected ? (
          <ConnectPrompt />
        ) : (
          <Tabs defaultValue="queries" value={tab} onValueChange={(value) => setTab(value as Tab)}>
            <div className="flex flex-row gap-2 justify-between items-center">
              <div className="overflow-x-auto">
                <TabsList>
                  <TabsTrigger value="queries">Keywords</TabsTrigger>
                  <TabsTrigger value="pages">Pages</TabsTrigger>
                </TabsList>
              </div>
            </div>
            <TabsContent value="queries">
              <QueriesList />
            </TabsContent>
            <TabsContent value="pages">
              <PagesList />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}

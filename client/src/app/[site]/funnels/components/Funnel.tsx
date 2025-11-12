"use client";

import { round } from "lodash";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { useState } from "react";
import { FunnelResponse, FunnelStep } from "../../../../api/analytics/funnels/useGetFunnel";
import { useGetFunnelStepSessions } from "../../../../api/analytics/funnels/useGetFunnelStepSessions";
import { EventIcon, PageviewIcon } from "../../../../components/EventIcons";
import { SessionCard, SessionCardSkeleton } from "../../../../components/Sessions/SessionCard";
import { Button } from "../../../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { useStore } from "../../../../lib/store";

export type FunnelChartData = {
  stepName: string;
  visitors: number;
  conversionRate: number;
  dropoffRate: number;
  stepNumber: number;
};

interface FunnelProps {
  data?: FunnelResponse[] | undefined;
  isError: boolean;
  error: unknown;
  isPending: boolean;
  steps: FunnelStep[];
}

const LIMIT = 25;

interface SessionsTabContentProps {
  sessions: any[];
  isLoading: boolean;
  page: number;
  setPage: (updater: (prev: number) => number) => void;
  hasNext: boolean;
  hasPrev: boolean;
  emptyMessage: string;
}

function SessionsTabContent({
  sessions,
  isLoading,
  page,
  setPage,
  hasNext,
  hasPrev,
  emptyMessage,
}: SessionsTabContentProps) {
  return (
    <>
      {(hasPrev || hasNext) && (
        <div className="flex items-center justify-end gap-2 mb-3 ">
          <Button
            variant="ghost"
            size="smIcon"
            onClick={e => {
              e.stopPropagation();
              setPage(p => p - 1);
            }}
            disabled={!hasPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-neutral-400">Page {page}</span>
          <Button
            variant="ghost"
            size="smIcon"
            onClick={e => {
              e.stopPropagation();
              setPage(p => p + 1);
            }}
            disabled={!hasNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
      {isLoading ? (
        <div className="space-y-3">
          <SessionCardSkeleton />
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-8 text-neutral-400">{emptyMessage}</div>
      ) : (
        <div className="space-y-3">
          {sessions.map(session => (
            <SessionCard key={session.session_id} session={session} />
          ))}
        </div>
      )}
    </>
  );
}

interface FunnelStepComponentProps {
  step: FunnelChartData;
  index: number;
  steps: FunnelStep[];
  chartData: FunnelChartData[];
  firstStep: FunnelChartData | undefined;
  siteId: number;
}

function FunnelStepComponent({ step, index, steps, chartData, firstStep, siteId }: FunnelStepComponentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTab, setCurrentTab] = useState<"reached" | "dropped">("reached");
  const [reachedPage, setReachedPage] = useState(1);
  const [droppedPage, setDroppedPage] = useState(1);
  const { time } = useStore();

  const maxBarWidth = 100;
  const ratio = firstStep?.visitors ? step.visitors / firstStep.visitors : 0;
  const barWidth = Math.max(ratio * maxBarWidth, 0);

  const prevStep = index > 0 ? chartData[index - 1] : null;
  const droppedFromPrevious = prevStep ? prevStep.visitors - step.visitors : 0;
  const dropoffPercent = prevStep ? (droppedFromPrevious / prevStep.visitors) * 100 : 0;
  const isFirstStep = index === 0;

  // Fetch sessions for "reached" mode
  const { data: reachedData, isLoading: isLoadingReached } = useGetFunnelStepSessions({
    steps,
    stepNumber: step.stepNumber,
    siteId,
    time,
    mode: "reached",
    page: reachedPage,
    limit: LIMIT,
    enabled: isExpanded && currentTab === "reached",
  });

  // Fetch sessions for "dropped" mode (only if not first step)
  // For step N, we want sessions that reached step N-1 but NOT step N
  const { data: droppedData, isLoading: isLoadingDropped } = useGetFunnelStepSessions({
    steps,
    stepNumber: step.stepNumber - 1, // Previous step
    siteId,
    time,
    mode: "dropped",
    page: droppedPage,
    limit: LIMIT,
    enabled: isExpanded && currentTab === "dropped" && !isFirstStep,
  });

  const reachedSessions = reachedData?.data || [];
  const droppedSessions = droppedData?.data || [];

  const hasNextReached = reachedSessions.length === LIMIT;
  const hasPrevReached = reachedPage > 1;
  const hasNextDropped = droppedSessions.length === LIMIT;
  const hasPrevDropped = droppedPage > 1;

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setCurrentTab("reached");
      setReachedPage(1);
      setDroppedPage(1);
    }
  };

  return (
    <div key={step.stepNumber} className="relative pb-4">
      {/* Step Header - Clickable */}
      <div
        className="flex items-center cursor-pointer hover:bg-neutral-800/30 rounded-md p-2 -ml-2 transition-colors"
        onClick={toggleExpansion}
      >
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-xs mr-2">
          {step.stepNumber}
        </div>
        <div className="font-medium text-sm flex items-center gap-2 flex-1">
          {steps[index]?.type === "page" ? <PageviewIcon /> : <EventIcon />}
          {step.stepName}
        </div>
        <div className="flex-shrink-0">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </div>

      {/* Bar and metrics */}
      <div className="flex items-center pl-8">
        {/* Metrics */}
        <div className="flex-shrink-0 min-w-[130px] mr-4 space-y-1">
          <div className="flex items-baseline">
            <span className="text-base font-semibold">{step.visitors.toLocaleString()}</span>
            <span className="text-sm text-neutral-400 ml-1">sessions</span>
          </div>
          {index !== 0 && (
            <div className="flex items-baseline text-orange-500 text-xs font-medium">
              {droppedFromPrevious.toLocaleString()} dropped
            </div>
          )}
        </div>

        {/* Bar */}
        <div className="flex-grow h-10 bg-neutral-800 rounded-md overflow-hidden relative mt-2">
          {/* Relative conversion bar (from previous step) */}
          {index > 0 && prevStep && (
            <div
              className="absolute h-full rounded-md"
              style={{
                width: `${(step.visitors / prevStep.visitors) * 100}%`,
                background: `repeating-linear-gradient(
                    45deg,
                    rgba(16, 185, 129, 0.25),
                    rgba(16, 185, 129, 0.25) 6px,
                    rgba(16, 185, 129, 0.15) 6px,
                    rgba(16, 185, 129, 0.15) 12px
                  )`,
              }}
            ></div>
          )}
          {/* Absolute conversion bar (from first step) */}
          <div className="h-full bg-emerald-500/70 rounded-md relative z-10" style={{ width: `${barWidth}%` }}></div>
          <div className="absolute top-2 right-2 z-20">
            <div className="text-base font-semibold">{round(step.conversionRate, 2)}%</div>
          </div>
        </div>
      </div>

      {/* Expanded Sessions Section */}
      {isExpanded && (
        <div className=" ml-4 p-4">
          <Tabs value={currentTab} onValueChange={val => setCurrentTab(val as "reached" | "dropped")}>
            <TabsList className="mb-1">
              <TabsTrigger value="reached">Reached ({step.visitors.toLocaleString()})</TabsTrigger>
              {!isFirstStep && (
                <TabsTrigger value="dropped">Dropped Off ({droppedFromPrevious.toLocaleString()})</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="reached">
              <SessionsTabContent
                sessions={reachedSessions}
                isLoading={isLoadingReached}
                page={reachedPage}
                setPage={setReachedPage}
                hasNext={hasNextReached}
                hasPrev={hasPrevReached}
                emptyMessage="No sessions reached this step in the selected time period."
              />
            </TabsContent>

            {!isFirstStep && (
              <TabsContent value="dropped">
                <SessionsTabContent
                  sessions={droppedSessions}
                  isLoading={isLoadingDropped}
                  page={droppedPage}
                  setPage={setDroppedPage}
                  hasNext={hasNextDropped}
                  hasPrev={hasPrevDropped}
                  emptyMessage="No sessions dropped off before reaching this step in the selected time period."
                />
              </TabsContent>
            )}
          </Tabs>
        </div>
      )}
    </div>
  );
}

export function Funnel({ data, steps, isError, error, isPending }: FunnelProps) {
  const { site } = useStore();

  // Prepare chart data
  const chartData =
    data?.map(step => ({
      stepName: step.step_name,
      visitors: step.visitors,
      conversionRate: step.conversion_rate,
      dropoffRate: step.dropoff_rate,
      stepNumber: step.step_number,
    })) || [];

  // Get first and last data points for total conversion metrics
  const firstStep = chartData[0];
  const lastStep = chartData[chartData.length - 1];
  const totalConversionRate = lastStep?.conversionRate || 0;

  return (
    <div className="mt-2">
      {isError ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-red-500">
            Error: {error instanceof Error ? error.message : "Failed to analyze funnel"}
          </div>
        </div>
      ) : data && chartData.length > 0 ? (
        <div className="space-y-0">
          {chartData.map((step, index) => (
            <FunnelStepComponent
              key={step.stepNumber}
              step={step}
              index={index}
              steps={steps}
              chartData={chartData}
              firstStep={firstStep}
              siteId={Number(site)}
            />
          ))}
        </div>
      ) : (
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-neutral-400 text-sm">
            {isPending ? "Analyzing funnel..." : "Configure your funnel steps and click 'Analyze Funnel'"}
          </div>
        </div>
      )}
      <div className="flex justify-between items-center gap-2 ml-4">
        <div className="flex items-center gap-4 mt-3 text-xs text-neutral-400">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-emerald-500/70 rounded-sm mr-1"></div>
            <span>Overall conversion</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-3 h-3 rounded-sm mr-1"
              style={{
                background: `repeating-linear-gradient(
                      45deg,
                      rgba(16, 185, 129, 0.25),
                      rgba(16, 185, 129, 0.25) 3px,
                      rgba(16, 185, 129, 0.15) 3px,
                      rgba(16, 185, 129, 0.15) 6px
                    )`,
              }}
            ></div>
            <span>Conversion from previous step</span>
          </div>
        </div>
      </div>
    </div>
  );
}

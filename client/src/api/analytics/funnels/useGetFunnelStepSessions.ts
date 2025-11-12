import { useQuery } from "@tanstack/react-query";
import { authedFetch, getQueryParams } from "../../utils";
import { GetSessionsResponse } from "../useGetUserSessions";
import { Time } from "../../../components/DateSelector/types";
import { FunnelStep } from "./useGetFunnel";

interface FunnelStepSessionsResponse {
  data: GetSessionsResponse;
}

export function useGetFunnelStepSessions({
  steps,
  stepNumber,
  siteId,
  time,
  mode,
  page = 1,
  limit = 25,
  enabled = false,
}: {
  steps: FunnelStep[];
  stepNumber: number;
  siteId: number;
  time: Time;
  mode: "reached" | "dropped";
  page?: number;
  limit?: number;
  enabled?: boolean;
}) {
  const timeParams = getQueryParams(time);

  return useQuery({
    queryKey: ["funnel-step-sessions", steps, stepNumber, siteId, timeParams, mode, page, limit],
    queryFn: async () => {
      return authedFetch<FunnelStepSessionsResponse>(
        `/funnel/${stepNumber}/sessions/${siteId}`,
        {
          ...timeParams,
          mode,
          page,
          limit,
        },
        {
          method: "POST",
          data: { steps },
        }
      );
    },
    enabled: !!siteId && !!steps && steps.length >= 2 && enabled,
  });
}

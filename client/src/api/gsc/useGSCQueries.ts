import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../lib/store";
import { authedFetch, getQueryParams } from "../utils";

export type GSCQuery = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

/**
 * Hook to fetch search query data from Google Search Console
 */
export function useGSCQueries() {
  const { site, time } = useStore();

  const timeParams = getQueryParams(time);

  return useQuery({
    queryKey: ["gsc-queries", site, timeParams],
    enabled: !!site,
    queryFn: () => {
      return authedFetch<{ data: GSCQuery[] }>(`/gsc/queries/${site}`, timeParams).then((res) => res.data);
    },
    // Refetch less frequently since GSC data updates slowly
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../lib/store";
import { authedFetch, getQueryParams } from "../utils";

export type GSCPage = {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

/**
 * Hook to fetch page data from Google Search Console
 */
export function useGSCPages() {
  const { site, time } = useStore();

  const timeParams = getQueryParams(time);

  return useQuery({
    queryKey: ["gsc-pages", site, timeParams],
    enabled: !!site,
    queryFn: () => {
      return authedFetch<{ data: GSCPage[] }>(`/gsc/pages/${site}`, timeParams).then((res) => res.data);
    },
    // Refetch less frequently since GSC data updates slowly
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

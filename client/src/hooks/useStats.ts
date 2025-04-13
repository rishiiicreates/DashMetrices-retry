import { useQuery } from "@tanstack/react-query";
import { AnalyticsSummary } from "@/types";

export function useStats() {
  return useQuery<AnalyticsSummary>({
    queryKey: ["/api/analytics"],
    staleTime: 60000, // 1 minute
  });
}

import { useQuery } from "@tanstack/react-query";
import { Platform } from "@/types";

export function usePlatforms() {
  return useQuery<Platform[]>({
    queryKey: ["/api/platforms"],
    staleTime: 60000, // 1 minute
  });
}

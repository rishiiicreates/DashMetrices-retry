import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { SavedProfile } from "@/types";

export function useSavedProfiles() {
  return useQuery<SavedProfile[]>({
    queryKey: ["/api/saved-profiles"],
    staleTime: 60000, // 1 minute
  });
}

export function useSaveProfile() {
  return useMutation({
    mutationFn: (profile: Omit<SavedProfile, "id" | "createdAt">) => {
      return apiRequest("POST", "/api/saved-profiles", profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/saved-profiles"] });
    },
  });
}

export function useRemoveSavedProfile() {
  return useMutation({
    mutationFn: (id: number) => {
      return apiRequest("DELETE", `/api/saved-profiles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/saved-profiles"] });
    },
  });
}

"use client"

import useSWR, { type SWRConfiguration } from "swr"
import { apiClient } from "./client"

// Generic hook for data fetching with SWR
export function useAPI<T>(endpoint: string | null, config?: SWRConfiguration<T>) {
  return useSWR<T>(endpoint, (url) => apiClient.get<T>(url), {
    revalidateOnFocus: false,
    ...config,
  })
}

// Pagination hook
export function usePaginatedAPI<T>(
  endpoint: string | null,
  page = 1,
  pageSize = 20,
  config?: SWRConfiguration<{ data: T[]; total: number; page: number; pageSize: number }>,
) {
  const url = endpoint ? `${endpoint}?page=${page}&pageSize=${pageSize}` : null
  return useSWR<{ data: T[]; total: number; page: number; pageSize: number }>(url, (url) => apiClient.get(url), {
    keepPreviousData: true,
    ...config,
  })
}

// Optimistic mutations
export async function mutateAPI<T>(
  endpoint: string,
  data?: unknown,
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
): Promise<T> {
  switch (method) {
    case "POST":
      return apiClient.post<T>(endpoint, data)
    case "PUT":
      return apiClient.put<T>(endpoint, data)
    case "PATCH":
      return apiClient.patch<T>(endpoint, data)
    case "DELETE":
      return apiClient.delete<T>(endpoint)
  }
}

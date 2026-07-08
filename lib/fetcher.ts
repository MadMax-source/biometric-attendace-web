import BACKENDAPI from "@/API";

export const fetcher = (url: string) =>
  BACKENDAPI.get(url).then((res) => res.data);

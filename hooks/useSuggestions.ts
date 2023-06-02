import { SuggestionsResponse } from "@/app/suggestions/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSuggestions = (code: string) => {
  return useQuery<any, any, SuggestionsResponse>({
    queryKey: ["suggestions", code],
    queryFn: () => fetchSuggestions(code),
  });
};

const fetchSuggestions = async (code: string) => {
  return await axios.get(`/suggestions/api/suggest?code=${code}`);
};

"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { SuggestionsResponse } from "./types";
import AuthSpotify from "@/app/authSpotify";
import { Results } from "@/app/suggestions/results";
import { ScaleLoader } from "react-spinners";

export default function Suggestions() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <DisplaySuggestions />
    </QueryClientProvider>
  );
}

function DisplaySuggestions() {
  const params = useSearchParams();
  const code = params.get("code");
  const error = params.get("error");

  const fetchSuggestions = async () => {
    return await axios.get(`/suggestions/api/suggest?code=${code}`);
  };

  const {
    data: suggestionsResponse,
    isLoading,
    isLoadingError,
  } = useQuery<any, any, SuggestionsResponse>(
    ["suggestions"],
    fetchSuggestions
  );

  const suggestions = suggestionsResponse?.data.matches;

  if (isLoadingError || error)
    return (
      <div>
        <span className="text-center font-bold">
          Something went wrong. Please try again.
        </span>
        <AuthSpotify />
      </div>
    );

  if (suggestions && suggestions.length === 0) {
    return (
      <div>
        <span className="text-center font-bold">No suggestions found.</span>
      </div>
    );
  }

  if (isLoading)
    return (
      <div>
        <div className="flex justify-center pb-4">
          <ScaleLoader
            loading={isLoading}
            color="white"
            height={18}
            width={12}
          />
        </div>
        <span className="text-center font-bold">Analysing liked tracks...</span>
      </div>
    );

  return (
    <main className="grid grid-cols-1 place-items-center">
      <div className="space-y-5 py-3 w-full">
        {suggestions && <Results suggestions={suggestions} />}
      </div>
    </main>
  );
}

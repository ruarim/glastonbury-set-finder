"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Button from "@/components/button";
import { Suggestion, SuggestionsResponse } from "./types";
import LoadingSpinner from "@/components/loading";
import AuthSpotify from "@/components/authSpotify";
import SpotifyLogo from "@/components/spotifyLogo";

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
          <LoadingSpinner />
        </div>
        <span className="text-center font-bold">Analysing liked tracks...</span>
      </div>
    );

  return (
    <main className="px-4">
      <h1 className="font-bold text-4xl pt-3">Suggested Performances</h1>
      <div className="space-y-5 py-3">
        {suggestions && <Results suggestions={suggestions} />}
      </div>
    </main>
  );
}

const Results = ({ suggestions }: { suggestions: Suggestion[] }) => {
  return (
    <>
      {suggestions.map((suggestion) => (
        <div className="space-y-2" key={suggestion.foundFrom.uri}>
          <div>
            <h2 className="font-bold">{suggestion.performance.title}</h2>
            <div>{suggestion.performance.stage}</div>
            <div>{suggestion.performance.day}</div>
            <div>{suggestion.performance.end}</div>
          </div>
          <div>
            <h2 className="font-bold">Found from artist:</h2>
            <div className="space-y-1">
              <div>{suggestion.foundFrom.name}</div>
              <div>
                <a
                  target="_blank"
                  href={suggestion.foundFrom.external_urls.spotify}
                >
                  <Button>
                    <div className="flex gap-1">
                      <span className="text-center">View on Spotify</span>
                      <SpotifyLogo />
                    </div>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

import ResultCard from "@/app/suggestions/result-card";
import { fetchSuggestions } from "./queries/get-suggestions";
import GetSuggestions from "../get-suggestions";

interface Params {
  searchParams: { code: string | undefined; error: string | undefined };
}

export default async function Suggestions({ searchParams }: Params) {
  const { code, error } = searchParams;

  if (error || !code) {
    return (
      <div className="flex justify-center">
        <div>
          <div className="text-center font-bold pb-1">Spotify Error⚠️</div>
          <GetSuggestions />
        </div>
      </div>
    );
  }

  const suggestionsResponse = await fetchSuggestions(code);
  const { suggestions } = suggestionsResponse;

  if (suggestions && suggestions.length === 0) {
    return (
      <div>
        <span className="text-center font-bold">No suggestions found.</span>
      </div>
    );
  }

  return (
    <main className="grid grid-cols-1 place-items-center">
      <div className="space-y-5 pt-3 pb-5 w-full">
        {suggestions && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-3 md:mx-24 pb-9">
            {suggestions.map((suggestion) => (
              <ResultCard
                suggestion={suggestion}
                key={suggestion.performance.time + suggestion.performance.stage}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

import ResultCard from "@/app/suggestions/result-card";
import { fetchSuggestions } from "./requests/get-suggestions";
import Container from "@/components/ui/container";

interface Params {
  searchParams: { code: string | undefined; error: string | undefined };
}

export default async function Suggestions({ searchParams }: Params) {
  const { code, error } = searchParams;

  if (error || !code) {
    return (
      <Container className="p-3">
        <span className="text-center font-bold">Spotify Error</span>
        <>⚠️</>
      </Container>
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

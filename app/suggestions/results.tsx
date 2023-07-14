import { Suggestion } from "@/app/suggestions/types";
import Button from "../../components/ui/button";
import SpotifyLogo from "../../components/ui/spotify-logo";
import { useArtist } from "@/hooks/useArtist";
import { Skeleton } from "./loading/skeleton";

export const Results = ({ suggestions }: { suggestions: Suggestion[] }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-3 md:mx-24 pb-9">
      {suggestions.map((suggestion) => (
        <ResultCard
          suggestion={suggestion}
          key={suggestion.performance.time + suggestion.performance.stage}
        />
      ))}
    </div>
  );
};

export const ResultCard = ({ suggestion }: { suggestion: Suggestion }) => {
  const { data } = useArtist(suggestion.foundFrom.id);
  const artist = data?.artist;

  return (
    <div
      className="flex flex-col border border-gray-500 rounded-lg p-4"
      key={suggestion.foundFrom.id}
    >
      <div className="flex flex-col justify-between h-full space-y-1">
        <div className="space-y-2">
          {artist?.images && artist?.images.length > 0 ? (
            <img
              className="h-[320px] w-full object-cover rounded-sm"
              src={artist?.images[0].url}
            />
          ) : (
            <Skeleton className="h-[320px] bg-gray-700/50" />
          )}

          <div>
            <h2 className="font-bold">{suggestion.performance.title}</h2>
            <div>{suggestion.performance.stage}</div>
            <div>{suggestion.performance.day}</div>
            <div>{suggestion.performance.time}</div>
          </div>
        </div>

        <div>
          <h2 className="font-bold pt-1">Found from artist..</h2>
          <div className="space-y-3">
            <div className="pb-1">{suggestion.foundFrom.name}</div>
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
  );
};

import { Suggestion } from "@/app/suggestions/types";
import Button from "./button";
import SpotifyLogo from "./spotifyLogo";
import { useArtist } from "@/hooks/useArtist";

export const Results = ({ suggestions }: { suggestions: Suggestion[] }) => {
  return (
    <div className="grid md:grid-cols-2 grid-rows-auto gap-3 md:mx-24">
      {suggestions.map((suggestion) => (
        <ResultCard
          suggestion={suggestion}
          key={suggestion.performance.end + suggestion.performance.stage}
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
      <div className="flex flex-col justify-between h-full">
        {artist?.images && (
          <div className="pb-2">
            <img
              className=" max-h-[320px] w-full object-cover"
              src={artist?.images[0].url}
            />
          </div>
        )}

        <div className="space-y-1">
          <h2>{suggestion.performance.title}</h2>
          <div>
            <div>{suggestion.performance.stage}</div>
            <div>{suggestion.performance.day}</div>
            <div>{suggestion.performance.end}</div>
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

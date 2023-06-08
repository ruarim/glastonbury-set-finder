import { Artist, Suggestion } from "@/app/suggestions/types";
import Button from "./button";
import SpotifyLogo from "./spotifyLogo";
import { useArtists } from "@/hooks/useArtists";

export const Results = ({ suggestions }: { suggestions: Suggestion[] }) => {
  const artistIds = suggestions.map((suggestion) => suggestion.foundFrom.id);
  const { data } = useArtists(artistIds);
  const artists = data?.artists;

  //check artist length = suggestions length
  //if not, return loading spinner
  //if yes, return results

  //if (!artists || artists.length !== suggestions.length)

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-3 md:mx-24">
      {artists &&
        suggestions.map((suggestion) => {
          const index = suggestions.indexOf(suggestion);
          const artist = artists[index];
          return (
            <ResultCard
              suggestion={suggestion}
              artist={artist}
              key={suggestion.performance.end + suggestion.performance.stage}
            />
          );
        })}
    </div>
  );
};

export const ResultCard = ({
  suggestion,
  artist,
}: {
  suggestion: Suggestion;
  artist: Artist;
}) => {
  return (
    <div
      className="flex flex-col border border-gray-500 rounded-lg p-4"
      key={suggestion.foundFrom.id}
    >
      <div className="flex flex-col justify-between h-full">
        {artist.images && artist.images[0] && (
          <div className="pb-2">
            <img
              className=" max-h-[320px] w-full object-cover"
              src={artist.images[0].url}
            />
          </div>
        )}

        <div>
          <h2 className="font-bold">{suggestion.performance.title}</h2>
          <div>{suggestion.performance.stage}</div>
          <div>{suggestion.performance.day}</div>
          <div>{suggestion.performance.end}</div>
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

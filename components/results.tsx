import { Suggestion } from "@/app/suggestions/types";
import Button from "./button";
import SpotifyLogo from "./spotifyLogo";
import { useArtist } from "@/hooks/useArtists";

export const Results = ({ suggestions }: { suggestions: Suggestion[] }) => {
  const artistIds = suggestions.map((suggestion) => suggestion.foundFrom.id);
  const { data } = useArtist(artistIds);

  console.log(data);

  // const artistsImage = data?.artists.map((artist) => artist.images[1].url);

  // console.log(artistsImage);

  return (
    <div className="grid md:grid-cols-2 grid-rows-auto gap-3">
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
  return (
    <div
      className="flex flex-col border border-gray-500 rounded-lg p-4"
      key={suggestion.foundFrom.id}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-1">
          <h2>{suggestion.performance.title}</h2>
          <div>
            <div>{suggestion.performance.stage}</div>
            <div>{suggestion.performance.day}</div>
            <div>{suggestion.performance.end}</div>
          </div>
        </div>

        {/* <div>
          <img
            className=" max-h-[320px] w-full object-cover"
            src={artistImage}
          />
        </div> */}

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

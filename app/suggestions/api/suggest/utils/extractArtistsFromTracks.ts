import { TracksResponse } from "@/app/suggestions/types";

export const extractArtistsFromTracks = async (
  savedTracks: TracksResponse[]
) => {
  const tracks = savedTracks.map((response) => response.track);

  const artists = tracks
    .map((track) => track.artists.map((artist) => artist))
    .flat();

  const uniqueArtists = artists.filter(
    (artist, index, self) =>
      index === self.findIndex((t) => t.name === artist.name)
  );

  return uniqueArtists;
};

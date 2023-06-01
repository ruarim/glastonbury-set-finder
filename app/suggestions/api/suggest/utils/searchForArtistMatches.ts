import { Artist, Performance } from "@/app/suggestions/types";

export const searchForArtistMatches = async (
  artists: Artist[],
  performances: Performance[]
) => {
  const matches = artists.map((artist) => {
    const regex = new RegExp(`\\b${escapeRegExp(artist.name)}\\b`, "i");
    const match = performances.find((performance) =>
      regex.test(performance.title)
    );

    if (match != null) return { performance: match, foundFrom: artist };
  });

  if (matches.length === 0) return [];

  const filteredMatches = matches.filter((match) => match != null);
  return filteredMatches;
};

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

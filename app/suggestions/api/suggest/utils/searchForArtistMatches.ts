import { Artist } from "@/app/suggestions/types";
import { Performance } from "@prisma/client";

export const searchForArtistMatches = async (
  artists: Artist[],
  performances: Performance[]
) => {
  const matches = artists.map((artist) => {
    return matchArtistToPerformances(artist, performances);
  });

  if (matches.length === 0) return [];

  const filteredMatches = matches.filter((match) => match != null);
  return filteredMatches;
};

const matchArtistToPerformances = (
  artist: Artist,
  performances: Performance[]
) => {
  const regex = new RegExp(`\\b${escapeRegExp(artist.name)}\\b`, "i");
  const match = performances.find((performance) =>
    regex.test(performance.title)
  );

  if (match != null) return { performance: match, foundFrom: artist };
};

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

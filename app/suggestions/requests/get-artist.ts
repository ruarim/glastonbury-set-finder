"use server";
import { ArtistResponse } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchArtist = async (artistId: string) => {
  const url = `${BASE_URL}/suggestions/api/artists?id=${artistId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Error fetching artist: Server responded with status " + response.status
      );
    }

    const data = await response.json();
    return data as ArtistResponse;
  } catch (error) {
    if (error instanceof Error) throw new Error("Error: " + error.message);
    throw new Error("Unkown error fetching artist data");
  }
};

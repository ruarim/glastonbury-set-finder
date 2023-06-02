import { ArtistResponse } from "@/app/suggestions/types";
import axios from "axios";

export const getArtist = async (id: string, accessToken: string) => {
  const artist: ArtistResponse[] = await requestArtist(id, accessToken);
  if (!artist) return null;
  return artist;
};

const requestArtist = async (id: string, accessToken: string) => {
  const url = `${process.env.NEXT_PUBLIC_SPOTIFY_API}/artists/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

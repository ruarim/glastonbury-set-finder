import { ArtistResponse } from "@/app/suggestions/types";
import axios from "axios";

export const getArtists = async (
  ids: string[],
  accessToken: string,
  i: number
) => {
  try {
    const artists: ArtistResponse[] = await requestArtist(ids[i], accessToken);
    console.log(i);
    console.log(ids[i]);

    if (i < ids.length) {
      const nextPageArtists: any[] = await getArtists(ids, accessToken, ++i);
      return [...artists, ...nextPageArtists];
    } else {
      return artists;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
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

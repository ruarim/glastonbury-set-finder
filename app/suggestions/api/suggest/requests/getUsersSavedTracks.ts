import { TracksResponse } from "@/app/suggestions/types";
import axios from "axios";

export const getUsersSavedTracks = async (
  accessToken: string,
  offset = 0,
  limit = 50
) => {
  try {
    const tracks: TracksResponse[] = await requestTracks(
      offset,
      limit,
      accessToken
    );

    if (tracks.length === limit) {
      const nextOffset = offset + limit;
      const nextPageTracks: TracksResponse[] = await getUsersSavedTracks(
        accessToken,
        nextOffset,
        limit
      );
      return [...tracks, ...nextPageTracks];
    } else {
      return tracks;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const requestTracks = async (
  offset: number,
  limit: number,
  accessToken: string
) => {
  const url = `${process.env.NEXT_PUBLIC_SPOTIFY_API}/me/tracks`;
  const userAuthToken = `Bearer ${accessToken}`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: userAuthToken,
      },
      params: {
        offset: offset,
        limit: limit,
      },
    });
    return res.data.items;
  } catch (error) {
    console.log(error);
    return [];
  }
};

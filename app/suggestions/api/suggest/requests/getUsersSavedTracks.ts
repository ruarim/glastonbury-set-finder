import { TracksResponse } from "@/app/suggestions/types";
import axios from "axios";

export const getUsersSavedTracks = async (
  accessToken: string,
  offset = 0,
  limit = 50
) => {
  const userTracksEndpoint = "https://api.spotify.com/v1/me/tracks";
  const spotifyUserAuthToken = `Bearer ${accessToken}`;

  try {
    const res = await axios.get(userTracksEndpoint, {
      headers: {
        Authorization: spotifyUserAuthToken,
      },
      params: {
        offset: offset,
        limit: limit,
      },
    });

    const tracks: TracksResponse[] = res.data.items;

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

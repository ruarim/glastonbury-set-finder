import { ArtistsResponse } from "@/app/suggestions/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useArtists = (artistIds: string[]) => {
  return useQuery<any, any, ArtistsResponse>({
    queryKey: ["artist", artistIds],
    queryFn: () => fetchArtists(artistIds),
  });
};

const fetchArtists = async (artistIds: string[]) => {
  const url = `/suggestions/api/artists`;
  const response = await axios.post(url, { ids: artistIds });
  const data = await response.data;

  if (response.status >= 400) {
    throw new Error(data.errors);
  }

  return data;
};

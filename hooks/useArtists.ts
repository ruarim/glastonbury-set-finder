import { Artist } from "@/app/suggestions/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ArtistResponse = {
  artists: ArtistImages[];
};

type ArtistImages = {
  images: {
    url: string;
    height: number;
    width: number;
  }[];
};

export const useArtist = (artistIds: string[]) => {
  return useQuery<any, any, ArtistResponse>({
    queryKey: ["artist", artistIds],
    queryFn: () => fetchArtist(artistIds),
  });
};

const fetchArtist = async (artistIds: string[]) => {
  const url = `/suggestions/api/artists`;
  const response = await axios.post(url, { ids: artistIds });
  const data = await response.data;

  if (response.status >= 400) {
    throw new Error(data.errors);
  }

  return data;
};

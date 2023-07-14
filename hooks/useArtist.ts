import { ArtistResponse } from "@/app/suggestions/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//use server components instead of react-query?
export const useArtist = (id: string) => {
  return useQuery<any, any, ArtistResponse>({
    queryKey: ["artist", id],
    queryFn: () => fetchArtist(id),
  });
};

const fetchArtist = async (artistId: string) => {
  const url = `/suggestions/api/artists?id=${artistId}`;
  const response = await axios.get(url);
  const data = await response.data;

  if (response.status >= 400) {
    throw new Error(data.errors);
  }

  return data;
};

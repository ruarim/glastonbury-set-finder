import { NextResponse } from "next/server";
import { fetchPerformances } from "./utils/webscraper";
import { Performance } from "../../types";
import { getUsersSavedTracks } from "./requests/getUsersSavedTracks";
import { getSpotifyToken } from "./requests/getSpotifyToken";
import { extractArtistsFromTracks } from "./utils/extractArtistsFromTracks";
import { searchForArtistMatches } from "./utils/searchForArtistMatches";

export async function GET(request: Request) {
  const code = await getSpotifyCodeFromParams(request.url);
  if (!code || code === "")
    return NextResponse.json({ error: "No code provided" }, { status: 400 });

  const accessToken = await getSpotifyToken(code);
  if (!accessToken)
    return NextResponse.json(
      { error: "Could not get access token" },
      { status: 400 }
    );

  const savedTracks = await getUsersSavedTracks(accessToken);
  if (savedTracks.length === 0)
    return NextResponse.json({ matches: [] });

  const savedArtists = await extractArtistsFromTracks(savedTracks);
  const glastonburyPerformances = (await fetchPerformances()) as Performance[];

  const matches = await searchForArtistMatches(
    savedArtists,
    glastonburyPerformances
  );

  if (matches.length === 0) return NextResponse.json({ matches: [] });

  return NextResponse.json({ matches });
}

const getSpotifyCodeFromParams = async (url: string) => {
  const { searchParams } = new URL(url);
  const code = searchParams.get("code");
  return code;
};

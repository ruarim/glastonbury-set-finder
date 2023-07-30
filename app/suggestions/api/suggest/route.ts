import { NextResponse } from "next/server";
import { getUserToken } from "./requests/getUserToken";
import { getUsersSavedTracks } from "./requests/getUsersSavedTracks";
import { extractArtistsFromTracks } from "./utils/extractArtistsFromTracks";
import { searchForArtistMatches } from "./utils/searchForArtistMatches";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const code = await getSpotifyCodeFromParams(request.url);
  if (!code || code === "")
    return NextResponse.json({ error: "No code provided" }, { status: 400 });

  const token = await getUserToken(code);
  if (!token)
    return NextResponse.json(
      { error: "Could not get access token" },
      { status: 400 }
    );

  const savedTracks = await getUsersSavedTracks(token);

  if (savedTracks.length === 0) return NextResponse.json({ matches: [] });

  const savedArtists = await extractArtistsFromTracks(savedTracks);

  const glastonburyPerformances = await prisma.performance.findMany();

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

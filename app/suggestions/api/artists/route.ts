import { NextResponse } from "next/server";
import { getSpotifyToken } from "./requests/getSpotifyToken";
import { getArtists } from "./requests/getArtist";

export async function POST(request: Request) {
  const { ids } = (await request.json()) as { ids: string[] };

  if (ids.length === 0)
    return NextResponse.json({ error: "No ids provided" }, { status: 400 });

  const token = await getSpotifyToken();
  if (!token)
    return NextResponse.json(
      { error: "Could not get access token" },
      { status: 400 }
    );

  const artists = await getArtists(ids, token, 0);
  if (!artists) return NextResponse.json({ error: "Could not get artist" });

  return NextResponse.json({
    artists,
  });
}

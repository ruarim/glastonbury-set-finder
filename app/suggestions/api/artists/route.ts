import { NextResponse } from "next/server";
import { getSpotifyToken } from "./requests/getSpotifyToken";
import { getArtist } from "./requests/getArtist";

export async function GET(request: Request) {
  const id = await getArtistIdFromParams(request.url);

  if (!id)
    return NextResponse.json({ error: "No id provided" }, { status: 400 });

  const token = await getSpotifyToken();
  if (!token)
    return NextResponse.json(
      { error: "Could not get access token" },
      { status: 400 }
    );

  const artist = await getArtist(id, token);
  if (!artist) return NextResponse.json({ error: "Could not get artist" });

  return NextResponse.json({
    artist,
  });
}

const getArtistIdFromParams = async (url: string) => {
  const { searchParams } = new URL(url);
  const id = searchParams.get("id");
  return id;
};

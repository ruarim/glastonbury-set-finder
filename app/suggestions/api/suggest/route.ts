import axios from "axios";
import { NextResponse } from "next/server";
import qs from "qs";
import { fetchPerformances } from "../webscraper";
import { Artist, Performance, TracksResponse } from "../../types";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PRIVATE_SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code || code === "")
    return NextResponse.json({ error: "No code provided" }, { status: 400 });

  const accessToken = await getSpotifyToken(code);
  if (!accessToken)
    return NextResponse.json(
      { error: "Could not get access token" },
      { status: 400 }
    );

  const savedTracksResponse = await getUsersSavedTracks(accessToken);
  if (savedTracksResponse.length === 0)
    return NextResponse.json({ matches: [] });

  const savedArtists = await extractArtistsFromTracks(savedTracksResponse);
  const glastonburyPerformances = (await fetchPerformances()) as Performance[];

  const matches = await searchForArtistMatches(
    savedArtists,
    glastonburyPerformances
  );
  if (matches.length === 0) return NextResponse.json({ matches: [] });

  return NextResponse.json({ matches });
}

const getSpotifyToken = async (code: string) => {
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const data = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
  };
  const spotifyAuthToken = `Basic ${Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64")}`;
  const formData = qs.stringify(data);

  try {
    const res = await axios.post(tokenEndpoint, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: spotifyAuthToken,
      },
    });
    return res.data.access_token;
  } catch {
    return null;
  }
};

const getUsersSavedTracks = async (
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
    return [];
  }
};

const extractArtistsFromTracks = async (savedTracks: TracksResponse[]) => {
  const tracks = savedTracks.map((response) => response.track);

  const artists = tracks
    .map((track) => track.artists.map((artist) => artist))
    .flat();

  const uniqueArtists = artists.filter(
    (artist, index, self) =>
      index === self.findIndex((t) => t.name === artist.name)
  );

  return uniqueArtists;
};

const searchForArtistMatches = async (
  artists: Artist[],
  performances: Performance[]
) => {
  const matches = artists.map((artist) => {
    const regex = new RegExp(`\\b${artist.name}\\b`, "i");
    const match = performances.find((performance) =>
      regex.test(performance.title)
    );

    if (match != null) return { performance: match, foundFrom: artist };
  });

  if (matches.length === 0) return [];

  const filteredMatches = matches.filter((match) => match != null);
  return filteredMatches;
};

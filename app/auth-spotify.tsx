"use client";

import Button from "../components/ui/button";
import Link from "next/link";

const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const responseType = "code";
const spotifyAuthUrl = `https://accounts.spotify.com/en/authorize?response_type=${responseType}&client_id=${clientId}&scope=user-library-read&redirect_uri=${redirectUri}&show_dialog=false`;

const AuthSpotify = () => {
  return (
    <Link href={spotifyAuthUrl}>
      <Button>Login with Spotify</Button>
    </Link>
  );
};

export default AuthSpotify;

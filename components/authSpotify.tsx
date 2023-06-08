"use client";
import Button from "./button";
import { useEffect, useState } from "react";

const AuthSpotify = () => {
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const responseType = "code";
  const spotifyAuthUrl = `https://accounts.spotify.com/en/authorize?response_type=${responseType}&client_id=${clientId}&scope=user-library-read&redirect_uri=${redirectUri}&show_dialog=false`;
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  return (
    <a href={spotifyAuthUrl}>
      <Button onClick={() => setLoading(true)} disabled={isLoading}>
        {isLoading ? "Loading..." : "Login with Spotify"}
      </Button>
    </a>
  );
};

export default AuthSpotify;

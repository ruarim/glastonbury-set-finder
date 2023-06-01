import Link from "next/link";
import Button from "./button";

const AuthSpotify = () => {
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const responseType = "code";
  const spotifyAuthUrl = `https://accounts.spotify.com/en/authorize?response_type=${responseType}&client_id=${clientId}&scope=user-library-read&redirect_uri=${redirectUri}&show_dialog=false`;

  return (
    <Link href={spotifyAuthUrl}>
      <Button>Get Suggestions</Button>
    </Link>
  );
};

export default AuthSpotify;

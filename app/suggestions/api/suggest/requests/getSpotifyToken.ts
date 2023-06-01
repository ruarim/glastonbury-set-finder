import QueryString from "qs";
import { clientId, clientSecret, redirectUri } from "../credentials";
import axios from "axios";

export const getSpotifyToken = async (code: string) => {
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const data = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
  };
  const spotifyAuthToken = `Basic ${Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64")}`;
  const formData = QueryString.stringify(data);

  try {
    const res = await axios.post(tokenEndpoint, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: spotifyAuthToken,
      },
    });
    return res.data.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};
import QueryString from "qs";
import { clientId, clientSecret, redirectUri } from "../../credentials";
import axios from "axios";

export const getUserToken = async (code: string) => {
  const tokenEndpoint = process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_ENDPOINT;
  const data = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
  };
  const formData = QueryString.stringify(data);
  const spotifyAuthToken = `Basic ${Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64")}`;

  try {
    const res = await axios.post(`${tokenEndpoint}`, formData, {
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

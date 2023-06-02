import QueryString from "qs";
import { clientId, clientSecret } from "../../credentials";
import axios from "axios";

export const getSpotifyToken = async () => {
  const tokenEndpoint = process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_ENDPOINT;

  const data = {
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  };
  const formData = QueryString.stringify(data);

  try {
    const res = await axios.post(`${tokenEndpoint}`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.data.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

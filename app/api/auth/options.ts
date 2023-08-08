import { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import GoogleProvider from "next-auth/providers/google";

const spotify_clientId = `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`;
const spotify_clientSecret = `${process.env.NEXT_PRIVATE_SPOTIFY_CLIENT_SECRET}`;
const google_clientId = `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`;
const google_clientSecret = `${process.env.NEXT_PRIVATE_GOOGLE_CLIENT_SECRET}`;

const secret = `${process.env.NEXTAUTH_SECRET}`;

export const options: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: spotify_clientId,
      clientSecret: spotify_clientSecret,
    }),
    GoogleProvider({
      clientId: google_clientId,
      clientSecret: google_clientSecret,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret,
  },
};

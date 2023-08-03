import { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const clientId = `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`;
const clientSecret = `${process.env.NEXT_PRIVATE_SPOTIFY_CLIENT_SECRET}`;
const secret = `${process.env.NEXTAUTH_SECRET}`;

export const options: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId,
      clientSecret,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret,
  },
};

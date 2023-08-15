import { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import GoogleProvider from "next-auth/providers/google";

const spotifyClientId = `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`;
const spotifySecret = `${process.env.NEXT_PRIVATE_SPOTIFY_SECRET_ID}`;
const googleClientId = `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`;
const googleSecret = `${process.env.NEXT_PRIVATE_GOOGLE_CLIENT_SECRET}`;
const secret = `${process.env.NEXTAUTH_SECRET}`;

export const options: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: spotifyClientId,
      clientSecret: spotifySecret,
    }),
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleSecret,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret,
  },
};

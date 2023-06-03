"use client";

import AuthSpotify from "@/components/authSpotify";
import SpotifyLogo from "@/components/spotifyLogo";

export default function Home() {
  return (
    <main className="space-y-3 md:w-[600px] ">
      <div className="border border-gray-500 rounded-lg p-8 flex flex-col justify-between space-y-12">
        <div className="space-y-3">
          <h1 className="font-bold justify-center text-5xl text-center pt-3">
            <div className="grid grid-cols-1 place-items-center p-2">
              <SpotifyLogo />
            </div>
            Glasto Finder
          </h1>

          <p className="text-center text-lg">
            Receive personalised Glastonbury performance recommendations based
            on your Spotify liked tracks.
          </p>
        </div>

        <div className="pt">
          <AuthSpotify />
        </div>
      </div>
    </main>
  );
}

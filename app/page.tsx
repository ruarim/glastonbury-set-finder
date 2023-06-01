"use client";

import AuthSpotify from "@/components/authSpotify";

export default function Home() {
  return (
    <main className="space-y-3 md:w-[600px] mx-12">
      <div className="border border-gray-500 rounded-lg p-12 bg-slate-500/30 ">
        <div className="space-y-3">
          <h1 className="font-bold justify-center text-5xl text-center">
            Glasto Finder
          </h1>

          <p className="text-center text-lg">
            Receive personalised Glastonbury set recommendations based on your
            Spotify liked tracks.
          </p>
        </div>
      </div>
      <div className="pt">
        <AuthSpotify />
      </div>
    </main>
  );
}

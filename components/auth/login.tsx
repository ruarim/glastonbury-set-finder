"use client";

import Button from "../ui/button";
import { signIn } from "next-auth/react";
import SpotifyLogo from "../ui/icons/spotify-logo";

export default function Login() {
  return (
    <div className="border border-gray-500 rounded-lg px-4 pt-5 pb-4 transition-all sm:my-8 md:w-[600px] w-full sm:max-w-lg sm:p-6">
      <div className="flex min-h-full flex-col justify-center px-10 md:px-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-md pb-4">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Sign in
          </h2>
        </div>
        <div className="relative my-3 w-full grid grid-cols-3">
          <div className="col-start-2">
            <hr />
            <small className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black text-white w-8 text-center">
              With
            </small>
          </div>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-3 py-4">
          <div className="sm:rounded-lg">
            <Button
              onClick={() => signIn("spotify")}
              type="submit"
              className="px-5 space-x-1"
            >
              <span>Spotify account</span> <SpotifyLogo />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

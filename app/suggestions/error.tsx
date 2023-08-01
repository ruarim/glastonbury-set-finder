"use client";

import AuthSpotify from "../auth-spotify";

export default function SuggestionsError() {
  return (
    <div>
      <div className="text-center font-bold pb-2 text-white">
        Something went wrong. Please try again.
      </div>
      <AuthSpotify />
    </div>
  );
}

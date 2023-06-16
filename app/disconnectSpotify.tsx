"use client";

import { usePathname } from "next/navigation";

const DisconnectSpotify = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/suggestions" && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.spotify.com/uk/account/apps/"
          className="border border-gray-200 hover:border-gray-400 hover:text-gray-400 rounded-full px-4 text-sm font-semibold text-gray-200 transition-colors duration-300 ease-in-out"
        >
          Disconnect
        </a>
      )}
    </>
  );
};

export default DisconnectSpotify;

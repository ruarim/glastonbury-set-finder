"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DisconnectSpotify = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/suggestions" && (
        <Link
          href="/disconnect"
          className="border border-gray-200 hover:border-gray-400 hover:text-gray-400 rounded-full px-4 text-sm font-semibold text-gray-200 transition-colors duration-300 ease-in-out"
        >
          Disconnect
        </Link>
      )}
    </>
  );
};

export default DisconnectSpotify;

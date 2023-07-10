"use client";

import ButtonLink from "@/components/link-button";
import { usePathname } from "next/navigation";

const DisconnectSpotify = () => {
  const pathname = usePathname();

  return (
    <ButtonLink
      url="/disconnect"
      showOnUrl="/suggestions"
      pathname={pathname}
      label="Disconnect"
    />
  );
};

export default DisconnectSpotify;

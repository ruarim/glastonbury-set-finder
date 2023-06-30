"use client";

import ButtonLink from "@/components/linkButton";
import { usePathname } from "next/navigation";

export default function HomeButton() {
  const pathname = usePathname();

  return (
    <ButtonLink
      url="/"
      showOnUrl="/disconnect"
      pathname={pathname}
      label="Home"
    />
  );
}

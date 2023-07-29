"use client";

import Button from "@/components/ui/button";
import { Toaster, toast } from "react-hot-toast";

export default function ShareGroup({ groupId }: { groupId: number }) {
  const toastConfig = {
    className: "font-bold ",
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/groups/${groupId}`;
    await navigator.clipboard.writeText(url);
    toast("Copied to clipboard!", toastConfig);
  };

  return (
    <div className="flex justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <Button onClick={handleShare} className="h-10 w-40">
        Share this group
      </Button>
    </div>
  );
}

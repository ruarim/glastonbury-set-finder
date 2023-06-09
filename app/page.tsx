import AuthSpotify from "@/app/authSpotify";
import SpotifyLogo from "@/components/spotifyLogo";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

const title = "Glasto-Finder";
const description =
  "Receive personalised Glastonbury performance recommendations based on your Spotify liked tracks.";
const url = `${process.env.NEXT_PUBLIC_BASE_URL}`;
const image = `${url}/glasto-finder-logo.png`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    title,
    description,
    url,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "Glasto Finder",
      },
    ],
  },
};

export default function Home() {
  revalidatePath("/");

  return (
    <main className="space-y-3 md:w-[600px] ">
      <div className="border border-gray-500 rounded-lg p-8 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <h1 className="font-bold justify-center text-5xl text-center pt-3">
            <div className="grid grid-cols-1 place-items-center p-2">
              <SpotifyLogo />
            </div>
            {title}
          </h1>

          <p className="text-center text-lg">{description}</p>
        </div>

        <AuthSpotify />
      </div>
    </main>
  );
}

import AuthSpotify from "@/app/authSpotify";
import SpotifyLogo from "@/components/spotifyLogo";
import { description, title } from "./layout";

export default function Home() {
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

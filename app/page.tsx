import AuthSpotify from "@/components/authSpotify";
import MetaTags from "@/components/metaTags";
import SpotifyLogo from "@/components/spotifyLogo";

export default function Home() {
  return (
    <main className="space-y-3 md:w-[600px] ">
      <MetaTags
        title="Glasto Finder"
        description="Receive personalised Glastonbury performance recommendations based on your Spotify liked tracks."
        url={`${process.env.NEXT_PUBLIC_BASE_URL}`}
        image={"@/public/glastoFinder.png"}
      />
      <div className="border border-gray-500 rounded-lg p-8 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <h1 className="font-bold justify-center text-5xl text-center pt-3">
            <div className="grid grid-cols-1 place-items-center p-2">
              <SpotifyLogo />
            </div>
            Glasto Finder
          </h1>

          <p className="text-center text-lg">
            Receive personalised Glastonbury performance recommendations based
            on your Spotify liked tracks.
          </p>
        </div>

        <AuthSpotify />
      </div>
    </main>
  );
}

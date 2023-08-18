import AuthSpotify from "@/app/get-suggestions";
import SpotifyLogo from "@/components/ui/icons/spotify-logo";
import { description, title } from "./metadata";
import Container from "@/components/ui/container";

export default function Home() {
  return (
    <main className="space-y-3 md:w-[600px]">
      <Container className="p-3 py-5">
        <div className="p-3 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <h1 className="font-bold justify-center text-5xl text-center pt-3">
              <div className="grid grid-cols-1 place-items-center p-2">
                <SpotifyLogo />
              </div>
              {title}
            </h1>
            <p className="text-center text-lg">{description}</p>
          </div>
          <div className="flex w-full justify-center">
            <AuthSpotify />
          </div>
        </div>
      </Container>
    </main>
  );
}

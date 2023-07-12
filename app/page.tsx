import AuthSpotify from "@/app/auth-spotify";
import SpotifyLogo from "@/components/spotify-logo";
import { description, title } from "./layout";
import Container from "@/components/container";

export default function Home() {
  return (
    <main className="space-y-3 md:w-[600px] ">
      <Container>
        <div className="p-8 flex flex-col justify-between space-y-6">
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
      </Container>
    </main>
  );
}

import Logout from "@/components/auth/logout";
import { getUser } from "../groups/requests/queries";

export default async function Settings() {
  const manageAccessUrl = "https://www.spotify.com/uk/account/apps/";
  const session = await getUser();

  return (
    <div className="border border-gray-500 rounded-lg p-8 flex flex-col justify-between space-y-6 px-12">
      <div className="grid grid-cols-1 place-items-center space-y-4">
        <div className="space-y-2 rounded-lg">
          <div className="text-2xl font-bold">Disconnect from this app:</div>
          <div>
            -Click the{" "}
            <span className="font-bold">&apos;Manage Acess&apos;</span> button.
          </div>
          <div>
            -Find <span className="font-bold">&apos;Glasto-Finder&apos;</span>{" "}
            in the list
          </div>
          <div>
            -Click <span className="font-bold">&apos;Remove Access&apos;</span>
          </div>
        </div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={manageAccessUrl}
          className={`border bg-black hover:border-gray-400 hover:text-gray-400 text-gray-100 flex w-full justify-center items-center rounded-full p-3 text-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:animate-pulse disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 ease-in-out`}
        >
          Manage Access
        </a>
        {session && (
          <div className="relative my-3 w-full grid grid-cols-3">
            <div className="col-start-2">
              <hr />
              <small className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black text-white w-8 text-center">
                Or
              </small>
            </div>
          </div>
        )}
        {session && <Logout />}
      </div>
    </div>
  );
}

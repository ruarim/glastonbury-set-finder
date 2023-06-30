export default function Disconnect() {
  const manageAccessUrl = "https://www.spotify.com/uk/account/apps/";

  return (
    <div className="border border-gray-500 rounded-lg p-8 flex flex-col justify-between space-y-6">
      <div className="grid grid-cols-1 place-items-center space-y-4">
        <div className="space-y-2 rounded-lg">
          <div className="text-2xl font-bold">To disconnect from this app:</div>
          <div>-Click the button below</div>
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
          className="w-full text-center border border-gray-200 hover:border-gray-400 hover:text-gray-400 rounded-lg px-4 py-2 text-base font-semibold text-gray-200 transition-colors duration-300 ease-in-out"
        >
          Disconnect
        </a>
      </div>
    </div>
  );
}

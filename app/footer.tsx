import Options from "./nav-options";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-1 bg-black text-gray-200 border-t border-gray-500 order-last">
      <div className="container mx-auto">
        <div className="flex justify-between px-4 h-full items-center">
          <div className="w-full sm:w-1/2 lg:w-3/12">
            <div className="w-full">
              <div className="text-sm space-x-1 flex">
                <span>Built by</span>
                <a
                  href="https://github.com/ruarim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  ruarim
                </a>
              </div>
            </div>
          </div>
          <Options />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

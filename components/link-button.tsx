import Link from "next/link";

interface ButtonLinkProps {
  url: string;
  showOnUrl: string;
  pathname: string;
  label: string;
}
const ButtonLink = ({ url, showOnUrl, pathname, label }: ButtonLinkProps) => {
  return (
    <>
      {pathname === showOnUrl && (
        <Link
          href={url}
          className="border border-gray-200 hover:border-gray-400 hover:text-gray-400 rounded-full px-4 text-sm font-semibold text-gray-200 transition-colors duration-300 ease-in-out"
        >
          {label}
        </Link>
      )}
    </>
  );
};

export default ButtonLink;

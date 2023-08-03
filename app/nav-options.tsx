"use client";

import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

export default function Options() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="pt-1">
        <Menu.Button className="rounded-md bg-black bg-opacity-20 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <div className="border border-gray-200 hover:border-gray-400 hover:text-gray-400 rounded-full px-3 text-lg text-gray-200 transition-colors duration-300 ease-in-out text-center">
            <BarsThree />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute text-white right-0 w-28 origin-bottom-right divide-y divide-gray-100 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none"
          style={{ top: "auto", bottom: "calc(100% + 0.3rem)" }}
        >
          <div>
            <Option href="/settings">Settings</Option>
            <Option href="/groups">Groups</Option>
            <Option href="/">Suggest</Option>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const Option = ({ children, href }: { children: ReactNode; href: string }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={href}
          className={`${
            active
              ? "text-gray-400 border-gray-400 "
              : "text-white border-gray-300 "
          } border group flex w-full items-center rounded-md px-2 py-2 text-sm bg-black transition-colors duration-300 ease-in-out`}
        >
          {children}
        </Link>
      )}
    </Menu.Item>
  );
};

const BarsThree = () => {
  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  );
};

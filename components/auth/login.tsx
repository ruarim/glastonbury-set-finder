"use client";

import { Transition } from "@headlessui/react";
import Button from "../ui/button";
import { signIn } from "next-auth/react";
import { Fragment } from "react";
import SpotifyLogo from "../ui/icons/spotify-logo";

export default function Login() {
  return (
    <div className="border border-gray-500 rounded-lg px-4 pt-5 pb-4 transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
      <div className="flex min-h-full flex-col justify-center px-10 md:px-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-md pb-4">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Sign in
          </h2>
        </div>
        <div className="relative my-3 w-full grid grid-cols-3">
          <div className="col-start-2">
            <hr />
            <small className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black text-white w-8 text-center">
              With
            </small>
          </div>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-2 sm:rounded-lg">
            <Button
              onClick={() => signIn("spotify")}
              className="px-5 space-x-1"
            >
              <span>Spotify account</span> <SpotifyLogo />
            </Button>
          </div>
          <div className="py-2 sm:rounded-lg">
            <Button onClick={() => signIn("google")} className="px-5 space-x-1">
              <span>Google account</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ModalProps {
  title?: string;
  children: React.ReactNode;
}

const Modal = ({ title, children }: ModalProps) => {
  return (
    <Transition.Root show={true} as={Fragment}>
      <div className="relative ">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-lg transition-opacity z-20" />
        </Transition.Child>

        <div className="fixed inset-0 z-20 overflow-y-auto ">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="border border-gray-500 rounded-lg">
                <div className="relative transform rounded-lg bg-black px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  {
                    <div className="flex justify-between">
                      <h3 className="text-xl font-medium leading-6">{title}</h3>
                    </div>
                  }
                  {children}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition.Root>
  );
};

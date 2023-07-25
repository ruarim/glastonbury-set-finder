"use client";

import { Fragment, useEffect, useState, useTransition } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useDebounce } from "@/hooks/useDebounce";
import { Performance } from "@prisma/client";

interface SearchInputProps {
  placeholder: string;
  selected: Performance;
  setSelected: (value: Performance) => void;
  filter: (query: string) => Promise<Performance[]>;
  className?: string;
  width?: string;
}

export default function SearchInput({
  placeholder,
  selected,
  setSelected,
  filter,
  className,
  width,
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Performance[]>([]);
  const debounceQuery = useDebounce(query, 300);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (debounceQuery.length === 0) setResults([]);

    if (debounceQuery.length > 2) {
      startTransition(async () => {
        const results = await filter(debounceQuery);
        setResults(results);
      });
    }
  }, [debounceQuery]);

  return (
    <div className={width}>
      {/* @ts-ignore FIX! on change can only take string as arg*/}
      <Combobox value={selected.title} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className={`${className} w-full h-full border-none py-2 pl-3 pr-3 text-sm leading-5 text-gray-900 focus:ring-0 truncate ...`}
              placeholder={placeholder}
              onChange={(event) => setQuery(event.target.value)}
              name="performance-id"
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {results.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : isPending ? (
                <>Loading...</>
              ) : (
                results.map((result, i) => (
                  <Combobox.Option
                    key={`result-${i}`}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={result}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {result.title}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

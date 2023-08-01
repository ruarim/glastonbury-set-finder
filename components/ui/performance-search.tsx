"use client";

import { Fragment, useEffect, useState, useTransition } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useDebounce } from "@/hooks/useDebounce";
import { Performance } from "@prisma/client";

interface PerformanceSearchInputProps {
  placeholder: string;
  selected: Performance;
  setSelected: (value: Performance) => void;
  filter: (query: string) => Promise<Performance[]>;
  className?: string;
  width?: string;
}

export default function PerformanceSearchInput({
  placeholder,
  selected,
  setSelected,
  filter,
  className,
  width,
}: PerformanceSearchInputProps) {
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
  }, [debounceQuery, filter]);

  return (
    <div className={width}>
      <Combobox<Performance | String>
        value={selected.title}
        onChange={setSelected}
      >
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden bg-black rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
            <Combobox.Input
              className={`${className} h-8 rounded-lg bg-gray-600 border border-gray-600 text-white text-base leading-5 w-full border-none pl-3 px-2 truncate ...`}
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
                <div className="relative cursor-default select-none py-1 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : isPending ? (
                <div className="text-gray-600 px-4 py-1">Loading...</div>
              ) : (
                results.map((result, i) => (
                  <Combobox.Option
                    key={`result-${i}`}
                    className={({ active }) =>
                      `relative cursor-default select-none py-1 px-4 ${
                        active ? "bg-gray-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={result}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {result.title + " - " + result.stage}
                        </span>
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

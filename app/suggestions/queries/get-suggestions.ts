"use server";

import { SuggestionsResponse } from "../types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchSuggestions = async (code: string) => {
  const url = `${BASE_URL}/suggestions/api/suggest?code=${code}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        "Error fetching suggestions: Server responded with status " +
          response.status
      );
    }

    const data = await response.json();
    return data as SuggestionsResponse;
  } catch (error) {
    if (error instanceof Error) throw new Error("Error: " + error.message);
    throw new Error("Unkown error fetching suggestions");
  }
};

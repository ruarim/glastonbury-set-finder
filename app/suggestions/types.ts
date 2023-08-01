export type Track = {
  artists: Artist[];
};

export type TracksResponse = {
  track: Track;
};

export type Artist = {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
  uri: string;
  href: string;
  images?: {
    url: string;
    height: number;
    width: number;
  }[];
};

export type ArtistResponse = {
  artist: Artist;
};

export type Performance = {
  title: string;
  stage: string;
  day: string;
  time: string;
};

export type Suggestion = {
  performance: Performance;
  foundFrom: Artist;
};

export type SuggestionsResponse = {
  suggestions: Suggestion[];
};

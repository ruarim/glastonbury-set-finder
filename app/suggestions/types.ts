export type Track = {
  artists: Artist[];
};

export type TracksResponse = {
  track: Track;
};

export type Artist = {
  name: string;
  external_urls: {
    spotify: string;
  };
  uri: string;
};

export type Performance = {
  title: string;
  stage: string;
  day: string;
  end: string;
};

export type Suggestion = {
  performance: Performance;
  foundFrom: Artist;
};

export type SuggestionsResponse = {
  data: {
    matches: Suggestion[];
  };
};

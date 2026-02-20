export interface MtgSet {
  baseSetSize: number;
  block?: string;
  code: string;
  isFoilOnly: boolean;
  isNonFoilOnly?: boolean;
  isOnlineOnly: boolean;
  isPartialPreview?: boolean;
  keyruneCode: string;
  languages: string[];
  mcmId?: number;
  mcmName?: string;
  mtgoCode?: string;
  name: string;
  parentCode?: string;
  releaseDate: string;
  tcgplayerGroupId?: number;
  tokenSetCode?: string;
  totalSetSize: number;
  type: string;
  translations: Translations;
}

export interface Translations {
  'Chinese Simplified': string | null;
  'Chinese Traditional': string | null;
  French: string | null;
  German: string | null;
  Italian: string | null;
  Japanese: string | null;
  Korean: string | null;
  'Portuguese (Brazil)': string | null;
  Russian: string | null;
  Spanish: string | null;
}

export interface MtgjsonListResponse<T> {
  data: T[];
  meta: MtgjsonMeta;
}

export interface MtgjsonMeta {
  date: string;
  version: string;
}


import {getMtgjsonClient} from "../mtgjsonClient";
import type {MtgjsonListResponse, MtgSet} from "../../types/Card";

/**
 * Get all set list MTG from MTGJSON API .
 */
export const fetchSetList = async (): Promise<MtgSet[]> => {
    const response = await getMtgjsonClient.get<MtgjsonListResponse<MtgSet>>("/SetList.json");
    return response.data.data;
};

/*
export const fetchCardList = async (setCode: string) => {
  const response = await getMtgjsonClient.get(`/Set/${setCode}.json`);
  return response.data.data.cards;
};
 */


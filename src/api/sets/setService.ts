import {getMtgjsonClient} from "../mtgjsonClient";
import type {MtgjsonListResponse, MtgSet} from "../../types/Sets.ts";

/**
 * Get all set list MTG from MTGJSON API.
 */
export const fetchSetList = (): Promise<MtgSet[]> =>
    getMtgjsonClient
        .get<MtgjsonListResponse<MtgSet>>("/SetList.json")
        .then((response) => response.data.data);

/*
export const fetchCardList = (setCode: string): Promise<Card[]> =>
    getMtgjsonClient
        .get<MtgjsonCardListResponse>(`/Set/${setCode}.json`)
        .then((response) => response.data.data.cards);
 */
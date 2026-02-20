import axios from 'axios';

export const getMtgjsonClient = axios.create({
  baseURL: "https://mtgjson.com/api/v5",
  timeout: 15000,
});
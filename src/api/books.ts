import axios from "axios";
import type { TSearchTarget } from "../types";

const API_URL = import.meta.env.VITE_API_ENDPOINT;
const API_KEY = import.meta.env.VITE_API_KEY;

interface IParams {
  query: string;
  page: number;
  target?: TSearchTarget;
}

export async function getBooks(
  query: string,
  page = 1,
  target?: TSearchTarget
) {
  const params: IParams = { query, page };
  if (target) params.target = target;

  const res = await axios.get(API_URL, {
    headers: { Authorization: `KakaoAK ${API_KEY}` },
    params,
  });
  return res.data;
}

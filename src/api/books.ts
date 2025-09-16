import axios from "axios";

const API_URL = import.meta.env.VITE_API_ENDPOINT;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function getBooks(query: string, page = 1) {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `KakaoAK ${API_KEY}`,
    },
    params: {
      query,
      page,
    },
  });
  return res.data;
}

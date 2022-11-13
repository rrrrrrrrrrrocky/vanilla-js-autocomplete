import { API_END_POINT, request } from "./common.js";

const fetchLanguages = async (keyword) =>
  request(`${API_END_POINT}/languages?keyword=${keyword}`);

export default fetchLanguages;

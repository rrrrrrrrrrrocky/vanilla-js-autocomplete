export const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const cache = {};

export const request = async (url, errorMessage = "요청에 실패했습니다.") => {
  if (cache[url]) {
    return cache[url];
  }
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    cache[url] = data;
    return data;
  }

  throw new Error(errorMessage);
};

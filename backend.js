import axios from "axios";

const API_KEY = "0a56bf3208b94d64a5953a38707c56b7";

export async function fetchNewsFromBackend(country, category) {
  const response = await axios.get("https://newsapi.org/v2/top-headlines", {
    params: {
      apiKey: API_KEY,
      country: country,
      category: category,
    },
  });

  return response.data.articles;
}

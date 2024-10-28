import { createContext, useState } from "react";
import { fetchNewsFromBackend } from "../backend";

export const NewsContext = createContext();

export function NewsContextProvider({ children }) {
  const [allNews, setAllNews] = useState([]);

  async function fetchNews(country, category) {
    const news = await fetchNewsFromBackend(country, category);
    setAllNews(news);
  }

  return (
    <NewsContext.Provider value={{ allNews, fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
}

import { useContext, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { NewsContext } from "../store/news-context";
import { useIsFocused } from "@react-navigation/native";
import NewsListItem from "../components/News/NewsListItem";

export default function NewsHome() {
  const { allNews, fetchNews } = useContext(NewsContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchNews();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={allNews}
        renderItem={({ item }) => <NewsListItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

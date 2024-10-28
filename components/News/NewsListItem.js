import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function NewsListItem({ item }) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      android_ripple={{ color: "#ccc" }}
      onPress={() => navigation.navigate("ViewNews", { item })}
    >
      <Image source={{ uri: item.urlToImage }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2, // For Android shadow effect
  },
  image: {
    width: "100%", // Full width of the container
    height: 200, // Adjust height as necessary
    borderRadius: 8, // Round corners for the image
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
});

import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Modal, Alert } from "react-native";
import { NewsContext } from "../store/news-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import NewsListItem from "../components/News/NewsListItem";
import RNPickerSelect from "react-native-picker-select";
import IconButton from "../components/ui/IconButton";
import { ActivityIndicator } from "react-native";
import Button from "../components/ui/Button";

const COUNTRY_OPTIONS = [{ label: "United States", value: "us" }];

const CATEGORY_OPTIONS = [
  { label: "General", value: "general" },
  { label: "Business", value: "business" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Health", value: "health" },
  { label: "Science", value: "science" },
  { label: "Sports", value: "sports" },
  { label: "Technology", value: "technology" },
];

export default function NewsHome() {
  const { allNews, fetchNews } = useContext(NewsContext);
  const isFocused = useIsFocused();
  const [country, setCountry] = useState("us");
  const [category, setCategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          name="filter-outline"
          size={24}
          color={tintColor}
          style={{ marginHorizontal: 15 }}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (selectedCountry || selectedCategory) {
      fetchNews(selectedCountry, selectedCategory);
    }
  }, [isFocused, selectedCountry, selectedCategory]);

  const applyFilters = () => {
    console.log(country);
    if (!country) {
      Alert.alert("Invalid Filter", "Please select a country.");
    } else {
      setModalVisible(false);
      setSelectedCountry(country);
      setSelectedCategory(category);
    }
  };

  if (selectedCountry && allNews.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading News Data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Filters</Text>

            <RNPickerSelect
              onValueChange={(value) => setCountry(value)}
              items={COUNTRY_OPTIONS}
              placeholder={{ label: "Select Country", value: null }}
              style={pickerSelectStyles}
              value={country}
            />

            <RNPickerSelect
              onValueChange={(value) => setCategory(value)}
              items={CATEGORY_OPTIONS}
              placeholder={{ label: "Select a category...", value: null }}
              style={pickerSelectStyles}
              value={category}
            />

            <View style={styles.modalButtonContainer}>
              <Button
                onPress={() => setModalVisible(false)}
                style={{ backgroundColor: "#fc5b5b" }}
              >
                Cancel
              </Button>
              <Button onPress={applyFilters}>Apply</Button>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={allNews}
        renderItem={({ item }) => <NewsListItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginVertical: 15,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 15,
  },
});

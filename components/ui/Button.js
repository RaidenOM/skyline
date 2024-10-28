import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Button({ children, onPress, style }) {
  return (
    <View style={[styles.outerContainer, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "#ccc" }}
        style={styles.innerContainer}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "blue",
    borderRadius: 8,
    overflow: "hidden",
    minWidth: 80,
  },
  innerContainer: {
    paddingVertical: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

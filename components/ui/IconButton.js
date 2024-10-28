import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function IconButton({ name, size, color, style, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.icon, style, pressed && styles.pressed]}
    >
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {},
  pressed: {
    opacity: 0.75,
  },
});

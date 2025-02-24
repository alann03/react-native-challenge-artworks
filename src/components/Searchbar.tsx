import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  placeholder: string;
  isLoading: boolean;
}

const Searchbar = ({ value, onChangeText, onSearch, onClear, placeholder, isLoading }: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />
      {Boolean(value) && (
        <>
          <TouchableOpacity onPress={onClear} disabled={isLoading} style={styles.iconContainer}>
            <Ionicons name="close" size={20} />
          </TouchableOpacity>
          <View style={styles.divider} />
        </>
      )}
      <TouchableOpacity onPress={onSearch} disabled={isLoading} style={styles.iconContainer}>
        <Ionicons name="search" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 8,
  },
  iconContainer: {
    padding: 4,
  },
  divider: {
    width: 1,
    height: "80%",
    backgroundColor: "#ccc",
    marginHorizontal: 8,
  },
});

export default Searchbar;

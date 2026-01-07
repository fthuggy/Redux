import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeTodo } from "@/features/todos/todoSlice";

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const allTodos = useAppSelector((state) => state.todos.todos);

  // Funktion för att radera alla todos
  const deleteAllTodos = () => {
    if (allTodos.length === 0) {
      Alert.alert("No todos to delete");
      return;
    }

    Alert.alert(
      "Delete All Todos",
      "Are you sure you want to delete all todos?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            allTodos.forEach((todo) => dispatch(removeTodo(todo.id)));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Pressable style={styles.deleteButton} onPress={deleteAllTodos}>
        <Text style={styles.deleteButtonText}>Delete All Todos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { addTodo, toggleTodo, removeTodo } from "@/features/todos/todoSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#f3f4f6",
  },
  addButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  todoCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#3b82f6",
    borderRadius: 4,
    marginRight: 12,
  },
  todoCheckboxCompleted: {
    backgroundColor: "#3b82f6",
  },
  todoTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937",
  },
  todoTextCompleted: {
    textDecorationLine: "line-through",
    color: "#6b7280",
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteButtonText: {
    fontSize: 28,
    color: "#dc2626",
    fontWeight: "bold",
  },
});

export default function TodoScreen() {
  const dispatch = useAppDispatch();
  const allTodos = useAppSelector((state) => state.todos.todos);
  const todos = allTodos.filter((todo) => !todo.completed);

  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Todos</Text>
        <Text style={styles.headerSubtitle}>{todos.length} tasks</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write a new todo..."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
          style={styles.input}
        />

        <Pressable
          style={styles.addButton}
          onPress={() => {
            if (text.trim()) {
              dispatch(addTodo(text));
              setText("");
            }
          }}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Pressable
              style={styles.todoTextContainer}
              onPress={() => dispatch(toggleTodo(item.id))}
            >
              <View
                style={[
                  styles.todoCheckbox,
                  item.completed && styles.todoCheckboxCompleted,
                ]}
              />
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.todoTextCompleted,
                ]}
              >
                {item.text}
              </Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() => dispatch(removeTodo(item.id))}
            >
              <Text style={styles.deleteButtonText}>×</Text>
            </Pressable>
          </View>
        )}
        scrollEnabled={true}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

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
import type { RootState } from "../store/store";

export default function TodoScreen() {
  const dispatch = useAppDispatch();
  const allTodos = useAppSelector((state) => state.todos.todos);
  const todos = allTodos.filter((todo) => !todo.completed);

  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Todos</Text>
        <Text style={styles.subtitle}>{todos.length} tasks</Text>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          placeholder="Write a new todo..."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
          style={styles.input}
        />

        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && { opacity: 0.7 },
          ]}
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
              style={styles.todoContent}
              onPress={() => dispatch(toggleTodo(item.id))}
            >
              <View
                style={[
                  styles.checkbox,
                  item.completed && styles.checkboxChecked,
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
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
  },
  inputSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  todoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#007AFF",
  },
  todoText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  todoTextCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteButtonText: {
    fontSize: 28,
    color: "#ff3b30",
    fontWeight: "bold",
    lineHeight: 28,
  },
});

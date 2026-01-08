import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  addTodo,
  toggleTodo,
  removeTodo,
  restoreTodo,
  selectTodosByFilter,
} from "@/features/todos/todoSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function TodoScreen() {
  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState<"all" | "completed" | "deleted">("all");
  const [text, setText] = useState("");

  const todos = useAppSelector((state) => selectTodosByFilter(state, filter));

  const activeCount = useAppSelector(
    (state) =>
      state.todos.todos.filter((t) => !t.completed && !t.deleted).length
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Todos</Text>
        <Text style={styles.headerSubtitle}>{activeCount} tasks</Text>
      </View>

      <View style={styles.filterContainer}>
        {(["all", "completed", "deleted"] as const).map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[
              styles.filterButton,
              filter === f && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextActive,
              ]}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {filter === "all" && (
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
      )}

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            {filter !== "deleted" ? (
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
            ) : (
              <Text style={styles.todoText}>{item.text}</Text>
            )}

            <Pressable
              style={styles.deleteButton}
              onPress={() =>
                filter === "deleted"
                  ? dispatch(restoreTodo(item.id))
                  : dispatch(removeTodo(item.id))
              }
            >
              <Text style={styles.deleteButtonText}>
                {filter === "deleted" ? "↩" : "×"}
              </Text>
            </Pressable>
          </View>
        )}
        scrollEnabled={true}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

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
    marginTop: 40,
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  filterButtonActive: {
    backgroundColor: "#3b82f6",
  },
  filterText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#ffffff",
    fontWeight: "700",
  },
});

import { View, Text, FlatList, StyleSheet } from "react-native";
import { useAppSelector } from "@/store/hooks";

export default function CompletedScreen() {
  const completedTodos = useAppSelector((state) =>
    state.todos.todos.filter((todo) => todo.completed)
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={completedTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No completed todos</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  text: { fontSize: 16 },
});

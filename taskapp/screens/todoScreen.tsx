import { useState } from "react";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import { addTodo, toggleTodo, removeTodo } from "@/features/todos/todoSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function TodoScreen() {
  const dispatch = useAppDispatch();
  const allTodos = useAppSelector((state) => state.todos.todos);
  const todos = allTodos.filter((todo) => !todo.completed);

  const [text, setText] = useState("");

  return (
    <View className="flex-1 bg-gray-100">
      <View className="px-5 pt-7 pb-5 bg-white border-b border-gray-200">
        <Text className="text-3xl font-bold text-gray-800 mb-1">My Todos</Text>
        <Text className="text-sm text-gray-500">{todos.length} tasks</Text>
      </View>

      <View className="flex-row px-5 py-4 bg-white gap-2.5">
        <TextInput
          placeholder="Write a new todo..."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-base bg-gray-100"
        />

        <Pressable
          className="bg-blue-500 px-5 py-2.5 rounded-lg justify-center active:opacity-70"
          onPress={() => {
            if (text.trim()) {
              dispatch(addTodo(text));
              setText("");
            }
          }}
        >
          <Text className="text-white text-base font-semibold">Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between bg-white rounded-lg mb-2 px-3 py-3 border border-gray-200">
            <Pressable
              className="flex-1 flex-row items-center gap-3"
              onPress={() => dispatch(toggleTodo(item.id))}
            >
              <View
                className={`w-6 h-6 border-2 border-blue-500 rounded ${
                  item.completed ? "bg-blue-500" : "bg-white"
                }`}
              />
              <Text
                className={`text-base flex-1 ${
                  item.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {item.text}
              </Text>
            </Pressable>

            <Pressable
              className="px-2 py-1"
              onPress={() => dispatch(removeTodo(item.id))}
            >
              <Text className="text-3xl text-red-600 font-bold">×</Text>
            </Pressable>
          </View>
        )}
        scrollEnabled={true}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 12 }}
      />
    </View>
  );
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  deleted?: boolean;
};

type TodosState = {
  todos: Todo[];
};

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.todos.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
        deleted: false,
      });
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo(state, action: PayloadAction<string>) {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.deleted = true;
      }
    },
    restoreTodo(state, action: PayloadAction<string>) {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.deleted = false;
      }
    },
  },
});

export const selectTodosByFilter = (
  state: RootState,
  filter: "all" | "completed" | "deleted"
) => {
  switch (filter) {
    case "all":
      return state.todos.todos.filter((t) => !t.deleted);
    case "completed":
      return state.todos.todos.filter((t) => t.completed && !t.deleted);
    case "deleted":
      return state.todos.todos.filter((t) => t.deleted);
  }
};

export const { addTodo, toggleTodo, removeTodo, restoreTodo } =
  todosSlice.actions;
export default todosSlice.reducer;

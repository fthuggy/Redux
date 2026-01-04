import { Provider } from "react-redux";
import { store } from "@/store/store";
import TodoScreen from "@/screens/todoScreen";

export default function HomeScreen() {
  return (
    <Provider store={store}>
      <TodoScreen />
    </Provider>
  );
}

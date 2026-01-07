import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { store } from "@/store/store";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack />
      </Provider>
    </SafeAreaView>
  );
}

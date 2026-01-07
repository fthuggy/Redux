import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { store, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack screenOptions={{ headerShown: false }} />
      </PersistGate>
    </Provider>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

//si on veut gérer des choses depuis reactQuery on gère tout depuis ici en bas
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </QueryClientProvider>
  );
}

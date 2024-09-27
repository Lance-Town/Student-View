import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ title: "Students List" }} // Default page title
            />
            <Stack.Screen name="[user]" />
        </Stack>
    );
}

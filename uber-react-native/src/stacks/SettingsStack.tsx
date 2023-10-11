import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/SettingsScreen";

export default function SettingsStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={SettingsScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

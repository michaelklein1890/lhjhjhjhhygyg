import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./components/Dashboard";

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={styles.container.backgroundColor}
        />
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ title: "لم يبقى الكثير فقط ركز Aminos" }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default App;

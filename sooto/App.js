import "react-native-gesture-handler";
import React from "react";
import { useColorScheme } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NativeBaseProvider, extendTheme } from "native-base";
// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
// DrawerContent
import DrawerContent from "./components/Navigation/Drawer/DrawerContent";
// Screens
import ProjectsScreen from "./screens/ProjectsScreen";
import KanbanScreen from "./screens/KanbanScreen";
import CalendarScreen from "./screens/CalendarScreen";
import CountdownScreen from "./screens/CountdownScreen";
import AboutScreen from "./screens/AboutScreen";
// Nav
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
// Theme
import { CustomeTheme } from "./data/theme/theme";

import { LogBox } from "react-native";

const ProjectStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: false,
        headerTintColor: "red",
      }}
    >
      <Stack.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Kanban"
        component={KanbanScreen}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  LogBox.ignoreAllLogs();
  const scheme = useColorScheme();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : navTheme}>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            drawerActiveTintColor: "red",
            headerTintColor: "red",
          }}
        >
          <Drawer.Screen
            name="Projects"
            // component={ProjectsScreen}
            component={ProjectStack}
            options={{
              title: "Projects",
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="cards-outline"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{
              title: "Calendar",
              drawerIcon: ({ color }) => (
                <FontAwesome name="calendar" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Countdown"
            component={CountdownScreen}
            options={{
              title: "Countdown",
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="timer-sand"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="About"
            component={AboutScreen}
            options={{
              title: "About SOOTO",
              drawerIcon: ({ color }) => (
                <Ionicons
                  name="ios-information-circle-outline"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

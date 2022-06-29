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
import DrawerContent from "./components/DrawerContent";
// Screens
import ProjectsScreen from "./screens/ProjectsScreen";
import KanbanScreen from "./screens/KanbanScreen";
import CalendarScreen from "./screens/CalendarScreen";
import CountdownScreen from "./screens/CountdownScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const ProjectStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
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
  const scheme = useColorScheme();
  const theme = extendTheme({
    components: {
      Heading: {
        baseStyle: (props) => {
          return {
            color: themeTools.mode("red.300", "blue.300")(props),
          };
        },
      },
    },
  });
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // primary: "rgb(255, 45, 85)",
    },
  };
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : navTheme}>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            drawerStyle: {
              // backgroundColor: "grey",
              // width: "100%",
            },
            drawerActiveTintColor: "red",
            // drawerInactiveTintColor: "yellow",
            // headerShown: true,
            // headerTransparent: true,
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
              // headerShown: false,
            }}
          />
          {/* <Drawer.Screen
            name="Kanban"
            component={KanbanScreen}
            options={{
              drawerItemStyle: {
                display: "none",
              },
            }}
          /> */}
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
            name="Settings"
            component={SettingsScreen}
            options={{
              title: "Settings",
              drawerIcon: ({ color }) => (
                <Ionicons name="settings-outline" size={24} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NativeBaseProvider } from "native-base";
// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
// DrawerContent
import DrawerContent from "./components/DrawerContent";
// Screens
import ProjectsScreen from "./screens/ProjectsScreen";
import CalendarScreen from "./screens/CalendarScreen";
import CountdownScreen from "./screens/CountdownScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            drawerStyle: {
              // backgroundColor: "grey",
              // width: "100%",
            },
            drawerActiveTintColor: "red",
            // drawerInactiveTintColor: "yellow",
            headerTintColor: "red",
          }}
        >
          <Drawer.Screen
            name="Projects"
            component={ProjectsScreen}
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

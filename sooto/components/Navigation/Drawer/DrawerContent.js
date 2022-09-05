import React from "react";
import { BackHandler, Alert } from "react-native";
import {
  Box,
  Heading,
  Text,
  VStack,
  useColorMode,
  Pressable,
  NativeBaseProvider,
} from "native-base";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Switch } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const clearAll = async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log("storage cleared");
//   } catch (e) {
//     // clear error
//   }

//   console.log("Done.");
// };

const AlertUser = () =>
  Alert.alert("Storage Cleared", "Please refresh the app to see the changes.", [
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);

const DrawerContent = (props) => {
  const { toggleColorMode } = useColorMode();

  return (
    <Box
      flex={1}
      h="100%"
      _dark={{
        bg: "coolGray.800",
      }}
      _light={{
        bg: "warmGray.50",
      }}
    >
      <DrawerContentScrollView {...props}>
        <Heading size="xl" pl={4} py={5} color="red.500" fontWeight="bold">
          SOOTO
        </Heading>
        <VStack flex={1} h="100%" justifyContent="space-between">
          <DrawerItemList {...props} />
          <VStack alignItems="flex-start" pl={4} mt={10} space={2}>
            <Text color="gray.500" fontWeight="bold">
              Dark Mode (Unavailable)
            </Text>
            <Switch size="md" colorScheme="red" isDisabled />
            <Pressable
              p={0}
              mt={2}
              onPress={() => {
                //  clearAll;
                AsyncStorage.clear();
                // BackHandler.exitApp();
                AlertUser();
              }}
            >
              <Text underline color="red.600">
                {" "}
                Clear Storage
              </Text>
            </Pressable>
          </VStack>
        </VStack>
      </DrawerContentScrollView>
    </Box>
  );
};

export default DrawerContent;

import React from "react";
import { View } from "react-native";
import { Box, Heading, Text, VStack, useColorMode, Button } from "native-base";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { AddIcon } from "native-base";
import { Switch } from "native-base";

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
              Dark Mode
            </Text>
            <Switch size="md" colorScheme="red" isDisabled />
          </VStack>
        </VStack>
      </DrawerContentScrollView>
    </Box>
  );
};

export default DrawerContent;

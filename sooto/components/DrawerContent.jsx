import React from "react";
import { View } from "react-native";
import { Box, Heading, Text, VStack } from "native-base";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { AddIcon } from "native-base";
import { Switch } from "native-base";

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Box flex={1} h="100%">
        <Heading pl={4} py={5} color="red.500">
          SOOTO
        </Heading>
        <VStack flex={1} h="100%" justifyContent="space-between">
          <DrawerItemList {...props} />
          <VStack pl={4} mt={10} space={2}>
            <Text color="gray.500" fontWeight="bold">
              Dark Mode
            </Text>
            <Switch colorScheme="red" />
          </VStack>
        </VStack>
      </Box>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

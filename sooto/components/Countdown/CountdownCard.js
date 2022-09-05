import React, { useState } from "react";

import {
  Center,
  VStack,
  HStack,
  Heading,
  Pressable,
  Text,
  NativeBaseProvider,
} from "native-base";

// Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CountdownCard = (props) => {
  const countdownDate = new Date(props.date);
  const now = new Date().getTime();
  var timeleft = countdownDate.getTime() - now;
  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24)) + 1;

  return (
    <VStack borderRadius={10} width="95%" bg="gray.50" shadow="3" p={4}>
      <HStack
        justifyContent="space-between"
        w="100%"
        alignItems="center"
        space={2}
        flexWrap="wrap"
      >
        <Heading noOfLines={1} flex={0.9}>
          {props.countdownName || "Card Label"}
        </Heading>
        <Pressable onPress={props.handleDelete}>
          <MaterialCommunityIcons
            name="close"
            size={24}
            color="black"
            flex={0.1}
          />
        </Pressable>
      </HStack>
      <Center flex={1} pb={2} m={2}>
        <Heading
          color="red.600"
          textAlign="center"
          size="2xl"
          fontWeight="bold"
        >
          {days + " days"}
        </Heading>
        <Text color="red.600" textAlign="center">
          {countdownDate.toDateString()}
        </Text>
      </Center>
    </VStack>
  );
};

export default CountdownCard;

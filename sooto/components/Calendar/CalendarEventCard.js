import React from "react";
import {
  VStack,
  Heading,
  Text,
  HStack,
  Pressable,
  NativeBaseProvider,
} from "native-base";
// Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CalendarEventCard = ({ eventName, dateString, handleDelete }) => {
  return (
    <VStack
      borderRadius={10}
      width="95%"
      justifyContent="flex-start"
      alignItems="flex-start"
      bg="gray.50"
      shadow="3"
      p={3}
      m={2}
    >
      <HStack
        justifyContent="space-between"
        w="100%"
        alignItems="center"
        space={2}
        flexWrap="wrap"
      >
        <Heading fontWeight="semibold" color="black" noOfLines={1}>
          {eventName}
        </Heading>
        <Pressable onPress={handleDelete}>
          <MaterialCommunityIcons
            name="close"
            size={24}
            color="black"
            flex={0.1}
          />
        </Pressable>
      </HStack>

      <Text color="black">{dateString}</Text>
    </VStack>
  );
};

export default CalendarEventCard;

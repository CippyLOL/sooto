import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Box, Text, Divider, VStack, HStack, Heading } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProjectCard = (props) => {
  return (
    <VStack
      borderRadius={10}
      width="95%"
      justifyContent="flex-start"
      alignItems="flex-start"
      bg="gray.300"
      p={3}
    >
      <TouchableOpacity onPress={props.onPress}>
        <HStack
          justifyContent="space-between"
          w="100%"
          alignItems="center"
          space={2}
          flexWrap="wrap"
        >
          <Heading fontWeight="bold" noOfLines={1} flex={0.9}>
            Project Card
          </Heading>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
            flex={0.1}
          />
        </HStack>
        <Box w="100%" pb={2}>
          <Text isTruncated noOfLines={2} color="gray.800">
            Project Description is here lkdjflkdjklj jdklffkldj dkfjdljfkld
            jfkldsjf lkdkfldj dlkjflkd jdkljjdk;jfk kdldkfldl ldkfl dfd
          </Text>
        </Box>

        <VStack ml={3}>
          <Text>
            To do{" "}
            <Text as="span" fontWeight="bold" color="red.500">
              (3)
            </Text>
          </Text>
          <Text>In progress (3)</Text>
          <Text>Done (3)</Text>
        </VStack>
      </TouchableOpacity>
    </VStack>
  );
};

export default ProjectCard;

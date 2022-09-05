import React from "react";
import {
  Text,
  VStack,
  HStack,
  Heading,
  Pressable,
  useDisclose,
  NativeBaseProvider,
} from "native-base";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// ACTIONSHEET
import ProjectCardActionsheet from "./ProjectCardActionsheet";

const ProjectCard = ({
  onPress,
  projectName,
  projectDescription,
  template,
  onPressDelete,
  projectValue,
  setProjectValue,
  onPressEdit,
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <VStack
      borderRadius={10}
      width="95%"
      justifyContent="flex-start"
      alignItems="flex-start"
      bg="gray.50"
      shadow="3"
      p={3}
    >
      <Pressable onPress={onPress}>
        <HStack
          justifyContent="space-between"
          w="100%"
          alignItems="center"
          space={2}
          flexWrap="wrap"
        >
          <Heading fontWeight="bold" noOfLines={1} flex={0.9}>
            {projectName}
          </Heading>
          <Pressable onPress={onOpen}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="black"
              flex={0.1}
            />
          </Pressable>
        </HStack>
        <VStack w="100%" pb={2}>
          <Text isTruncated noOfLines={2} color="gray.800">
            {projectDescription}
          </Text>
          <Text color="red.300">Template: {template ?? "none"}</Text>
        </VStack>
      </Pressable>

      <ProjectCardActionsheet
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onPressDelete={onPressDelete}
        projectValue={projectValue}
        setProjectValue={setProjectValue}
        onPressEdit={onPressEdit}
      />
    </VStack>
  );
};

export default ProjectCard;

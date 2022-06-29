import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Box, Text, Divider, VStack, Button } from "native-base";
import ProjectCard from "../components/ProjectCard";
import { AddIcon } from "native-base";

const ProjectsScreen = (props) => {
  return (
    <VStack
      bg="white"
      flex={1}
      justifyContent="flex-start"
      alignItems="center"
      py={5}
      space={4}
    >
      <ProjectCard
        onPress={() => {
          props.navigation.navigate("Kanban", { title: "test" });
        }}
      />
      <ProjectCard
        onPress={() => {
          props.navigation.navigate("Kanban", { title: "test" });
        }}
      />
      <Button p={4} colorScheme="red" w="95%" leftIcon={<AddIcon />}>
        Add Project
      </Button>
    </VStack>
  );
};

export default ProjectsScreen;

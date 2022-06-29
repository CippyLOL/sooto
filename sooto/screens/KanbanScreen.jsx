import React from "react";
import { View } from "react-native";
import { Box, Text } from "native-base";

const KanbanScreen = (props) => {
  props.navigation.setOptions({ title: "Project Name" });
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text fontSize="2xl">Kanban Screen</Text>
      <Text fontSize="sm">This is a descdd</Text>
    </Box>
  );
};

export default KanbanScreen;

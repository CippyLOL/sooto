import React from "react";
import { View } from "react-native";
import { Box, Text } from "native-base";

const SettingsScreen = (props) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text fontSize="2xl">Settings Screen</Text>
      <Text fontSize="sm">This is a desc</Text>
    </Box>
  );
};

export default SettingsScreen;

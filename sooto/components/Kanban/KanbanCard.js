import React from "react";
import {
  Box,
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
import KanbanCardActionsheet from "./KanbanCardActionsheet";

const KanbanCard = ({
  cardLabel,
  cardDescription,
  onPressDeleteCard,
  cardValue,
  setCardValue,
  onSubmitEditCard,
  boardNames,
  boardName,
  moveBoardIndex,
  setMoveBoardIndex,
  onSubmitMoveCard,
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <VStack
      m={2}
      borderRadius={10}
      bg="gray.50"
      shadow="3"
      p={3}
      flex={1}
      alignSelf="stretch"
    >
      <HStack
        justifyContent="space-between"
        w="100%"
        alignItems="center"
        space={2}
        flexWrap="wrap"
      >
        {cardLabel ? (
          <Heading fontWeight="bold" noOfLines={1} flex={0.9}>
            {cardLabel}
          </Heading>
        ) : (
          <Heading fontWeight="bold" noOfLines={1} flex={0.9} color="gray.600">
            No Card Label
          </Heading>
        )}

        <Pressable onPress={onOpen}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
            flex={0.1}
          />
        </Pressable>
      </HStack>
      <Box w="100%" pb={2}>
        {cardDescription ? (
          <Text isTruncated noOfLines={2} color="gray.800">
            {cardDescription}
          </Text>
        ) : (
          <Text isTruncated noOfLines={2} color="gray.300">
            No Card description
          </Text>
        )}
      </Box>

      <KanbanCardActionsheet
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onPressDeleteCard={onPressDeleteCard}
        cardValue={cardValue}
        setCardValue={setCardValue}
        onSubmitEditCard={onSubmitEditCard}
        boardNames={boardNames}
        boardName={boardName}
        moveBoardIndex={moveBoardIndex}
        setMoveBoardIndex={setMoveBoardIndex}
        onSubmitMoveCard={onSubmitMoveCard}
      />
    </VStack>
  );
};

export default KanbanCard;

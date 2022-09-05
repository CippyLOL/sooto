import React, { useState } from "react";

import {
  HStack,
  Heading,
  Pressable,
  Modal,
  Stack,
  FormControl,
  Input,
  TextArea,
  Button,
  NativeBaseProvider,
} from "native-base";

const KanbanBoardHeader = ({
  text,
  deleteBoard,
  cardValue,
  setCardValue,
  onSubmitAddCard,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  const valueLabelChangeHandler = (text) => {
    setCardValue({ ...cardValue, cardLabel: text });
  };

  const valueDescriptionChangeHandler = (text) => {
    setCardValue({ ...cardValue, cardDescription: text });
  };

  return (
    <HStack justifyContent="space-between" alignItems="center" px={3}>
      <Pressable
        flex={1}
        onPress={() => {
          console.log("onpress triggered");
          setShowDeleteModal(true);
        }}
      >
        <Heading fontWeight="bold">{text}</Heading>
      </Pressable>
      <Button
        onPress={() => {
          console.log("onpress triggered");
          setShowAddCardModal(true);
        }}
        variant="link"
        colorScheme="red"
        size="md"
      >
        Add Card
      </Button>
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Delete Board?</Modal.Header>

          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowDeleteModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onPress={() => {
                  deleteBoard();

                  setShowDeleteModal(false);
                }}
              >
                Delete
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal
        isOpen={showAddCardModal}
        onClose={() => setShowAddCardModal(false)}
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add Card</Modal.Header>
          <Modal.Body>
            <Stack space={5}>
              <FormControl isRequired>
                <FormControl.Label>Label</FormControl.Label>
                <Input
                  variant="underlined"
                  p={2}
                  placeholder="Label"
                  value={cardValue}
                  onChangeText={valueLabelChangeHandler}
                />
                <FormControl.Label>Card Description</FormControl.Label>
                <TextArea
                  variant="underlined"
                  p={2}
                  placeholder="Description"
                  value={cardValue}
                  onChangeText={valueDescriptionChangeHandler}
                />
              </FormControl>
            </Stack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowAddCardModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onPress={() => {
                  onSubmitAddCard();
                  console.log("add card pressed");
                  setShowAddCardModal(false);
                }}
              >
                Add Card
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </HStack>
  );
};

export default KanbanBoardHeader;

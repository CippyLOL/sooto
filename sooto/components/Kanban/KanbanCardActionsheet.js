import React, { useState } from "react";

import {
  Text,
  VStack,
  Heading,
  Actionsheet,
  Icon,
  Modal,
  Stack,
  FormControl,
  Input,
  TextArea,
  Button,
  Select,
  CheckIcon,
  NativeBaseProvider,
} from "native-base";

// Icons
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

const KanbanCardActionsheet = ({
  isOpen,
  onClose,
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
  const [showEditCardModal, setShowEditCardModal] = useState(false);
  const [showDeleteCardModal, setShowDeleteCardModal] = useState(false);
  const [showMoveCardModal, setShowMoveCardModal] = useState(false);

  const valueLabelChangeHandler = (text) => {
    setCardValue({ ...cardValue, cardLabel: text });
  };

  const valueDescriptionChangeHandler = (text) => {
    setCardValue({ ...cardValue, cardDescription: text });
  };

  const valueBoardIndexChangeHandler = (index) => {
    setMoveBoardIndex(index);
  };
  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() => setShowEditCardModal(true)}
            startIcon={
              <Icon
                as={<FontAwesome name="pencil" />}
                color="gray.600"
                size="6"
              />
            }
          >
            <Text fontSize="md" color="gray.600">
              {" "}
              Edit Card
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            isDisabled={boardNames.length <= 1 ? true : false}
            onPress={() => setShowMoveCardModal(true)}
            startIcon={
              <Icon
                as={<MaterialCommunityIcons name="arrow-u-right-bottom" />}
                color="gray.600"
                size="6"
              />
            }
          >
            <Text fontSize="md" color="gray.600">
              {" "}
              Move Card
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setShowDeleteCardModal(true);
            }}
            startIcon={
              <Icon
                as={<FontAwesome name="trash" />}
                color="red.600"
                size="6"
              />
            }
          >
            <Text fontSize="md" color="red.600">
              {" "}
              Delete Card
            </Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <Modal
        isOpen={showEditCardModal}
        onClose={() => setShowEditCardModal(false)}
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit Card</Modal.Header>
          <Modal.Body>
            <Stack space={5}>
              <FormControl isRequired>
                <FormControl.Label>Label</FormControl.Label>
                <Input
                  variant="underlined"
                  p={2}
                  placeholder="Name"
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
                  setShowEditCardModal(false);
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onPress={() => {
                  onSubmitEditCard();
                  setShowEditCardModal(false);
                  onClose();
                }}
              >
                Edit Card
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal
        isOpen={showMoveCardModal}
        onClose={() => setShowMoveCardModal(false)}
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Move Card</Modal.Header>
          <Modal.Body>
            <VStack justifyContent="center">
              <FormControl isRequired>
                <FormControl.Label>Choose Board</FormControl.Label>
                <Select
                  placeholder="Choose Board"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size={5} />,
                  }}
                  onValueChange={valueBoardIndexChangeHandler}
                >
                  {boardNames &&
                    boardNames.map((name, index) => {
                      var isDisabled = false;

                      if (name == boardName) {
                        isDisabled = true;
                      }

                      return (
                        <Select.Item
                          key={index}
                          label={name}
                          value={index}
                          isDisabled={isDisabled}
                        />
                      );
                    })}
                </Select>
              </FormControl>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowMoveCardModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onPress={() => {
                  onSubmitMoveCard();
                  setShowMoveCardModal(false);
                  onClose();
                }}
              >
                Move Card
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal
        isOpen={showDeleteCardModal}
        onClose={() => {
          setShowDeleteCardModal(false);
        }}
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Delete Card</Modal.Header>
          <Modal.Body>
            <VStack justifyContent="center" alignItems="center" space={5}>
              <Heading fontWeight="semibold" color="red.600">
                Delete Card?
              </Heading>
              <Button.Group
                isAttached
                colorScheme="red"
                mx={{
                  base: "auto",
                  md: 0,
                }}
                size="sm"
              >
                <Button
                  onPress={() => {
                    onPressDeleteCard();
                    setShowDeleteCardModal(false);
                    onClose();
                  }}
                >
                  Delete
                </Button>
                <Button variant="outline">Cancel</Button>
              </Button.Group>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default KanbanCardActionsheet;

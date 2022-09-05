import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  FormControl,
  Input,
  Modal,
  ScrollView,
  Spinner,
  Center,
  VStack,
  AddIcon,
  NativeBaseProvider,
} from "native-base";

import KanbanCard from "../components/Kanban/KanbanCard";
import KanbanBoardHeader from "../components/Kanban/KanbanBoardHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const KanbanScreen = ({ route, navigation, ...props }) => {
  // NAV PARAMS
  const { title, projectName, projectId } = route.params;
  navigation.setOptions({ title: title });

  // STATES
  const [jsonData, setJsonData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newBoard, setNewBoard] = useState({ boardCards: [] });
  const [newCard, setNewCard] = useState({
    cardLabel: "",
    cardDescription: "",
  });
  const [editCard, setEditCard] = useState({
    cardLabel: "",
    cardDescription: "",
  });
  const [moveBoardIndex, setMoveBoardIndex] = useState(null);

  const storeData = async ({ key, value }) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // read error
      console.log(e);
    }
    console.log("Done.");
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(projectId);
      const jsonValue = JSON.parse(value);

      return jsonValue != null ? jsonValue : null;
    } catch (e) {
      // read error
      console.log(e);
    }

    console.log("Done.");
  };

  useEffect(() => {
    getData().then((value) => setJsonData(value));
    // console.log(jsonData);
    return () => {};
  }, [setJsonData, storeData]);

  return (
    <ScrollView bg="white">
      <VStack minH="100%" py={5} px={2} space={5}>
        {jsonData != null ? (
          jsonData["boards"].map((board, index) => {
            const boardId = board.boardId;
            const boardIndex = index;
            const boardName = board.boardName;

            return (
              <Box key={index}>
                <KanbanBoardHeader
                  text={board.boardName}
                  deleteBoard={() => {
                    if (jsonData != null) {
                      var copyJsonData = jsonData;

                      copyJsonData["boards"].forEach((board, index) => {
                        if (board.boardId === boardId) {
                          return copyJsonData["boards"].splice(index, 1);
                        }
                      });

                      copyJsonData["boardNames"].forEach((boardName, index) => {
                        if (boardName === board.boardName) {
                          return copyJsonData["boardNames"].splice(index, 1);
                        }
                      });

                      storeData({
                        key: projectId,
                        value: copyJsonData,
                      });
                      getData();
                    }
                  }}
                  cardValue={newCard}
                  setCardValue={setNewCard}
                  onSubmitAddCard={() => {
                    const id = uuid.v4();
                    if (jsonData != null) {
                      var copyJsonData = jsonData;
                      const cardId = "card-" + id;

                      copyJsonData["boards"][index]["boardCards"].push({
                        ...newCard,
                        cardId: cardId,
                      });
                      console.log(copyJsonData);

                      storeData({
                        key: projectId,
                        value: copyJsonData,
                      });
                      getData();
                    }
                  }}
                />
                {board["boardCards"].map((card, index) => {
                  const cardId = card.cardId;
                  const cardIndex = index;

                  const boardNames = jsonData["boardNames"];

                  return (
                    <KanbanCard
                      key={index}
                      cardLabel={card.cardLabel}
                      cardDescription={card.cardDescription}
                      onPressDeleteCard={() => {
                        if (jsonData != null) {
                          var copyJsonData = jsonData;

                          copyJsonData["boards"][boardIndex][
                            "boardCards"
                          ].forEach((card, index) => {
                            if (card.cardId === cardId) {
                              return copyJsonData["boards"][boardIndex][
                                "boardCards"
                              ].splice(index, 1);
                            }
                          });

                          storeData({
                            key: projectId,
                            value: copyJsonData,
                          });
                          getData();
                        }
                      }}
                      cardValue={editCard}
                      setCardValue={setEditCard}
                      boardNames={boardNames}
                      boardName={boardName}
                      moveBoardIndex={moveBoardIndex}
                      onSubmitEditCard={() => {
                        if (jsonData != null) {
                          var copyJsonData = jsonData;

                          copyJsonData["boards"][boardIndex]["boardCards"][
                            cardIndex
                          ] = {
                            ...editCard,
                            cardId,
                          };

                          storeData({
                            key: projectId,
                            value: copyJsonData,
                          });
                          getData();
                          setEditCard({
                            cardLabel: "",
                            cardDescription: "",
                          });
                        }
                      }}
                      setMoveBoardIndex={setMoveBoardIndex}
                      onSubmitMoveCard={() => {
                        if (jsonData != null && moveBoardIndex != null) {
                          var copyJsonData = jsonData;

                          const moveCard = {
                            cardId: card.cardId,
                            cardLabel: card.cardLabel,
                            cardDescription: card.cardDescription,
                          };

                          // delete card from current board location
                          copyJsonData["boards"][boardIndex][
                            "boardCards"
                          ].forEach((card, index) => {
                            if (card.cardId === cardId) {
                              return copyJsonData["boards"][boardIndex][
                                "boardCards"
                              ].splice(index, 1);
                            }
                          });

                          if (moveBoardIndex != null) {
                            copyJsonData["boards"][moveBoardIndex][
                              "boardCards"
                            ].push(moveCard);
                            storeData({
                              key: projectId,
                              value: copyJsonData,
                            });
                            getData();
                          }
                        }
                      }}
                    />
                  );
                })}
              </Box>
            );
          })
        ) : (
          <Center minH="100%">
            <Spinner size="lg" color="red.600" />
          </Center>
        )}
        <Center mb={10}>
          <Button
            p={4}
            colorScheme="red"
            w="95%"
            leftIcon={<AddIcon />}
            onPress={() => setShowModal(true)}
          >
            Add Board
          </Button>
        </Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Add Board</Modal.Header>
            <Modal.Body>
              <Stack space={5}>
                <Box>
                  <FormControl.Label>Board Name</FormControl.Label>
                  <Input
                    variant="underlined"
                    p={2}
                    placeholder="Name"
                    onChangeText={(value) => {
                      setNewBoard({
                        ...newBoard,
                        boardName: value,
                      });
                      console.log(newBoard);
                    }}
                  />
                </Box>
              </Stack>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onPress={() => {
                    const id = uuid.v4();

                    const boardId = "board-" + id;
                    const newBoardData = { ...newBoard, boardId: boardId };
                    const boardName = newBoard["boardName"];

                    console.log(boardName);

                    var copyJsonData = jsonData;

                    copyJsonData["boards"].push(newBoardData);
                    copyJsonData["boardNames"].push(boardName);
                    // console.log(copyJsonData);

                    if (jsonData != null) {
                      storeData({
                        key: projectId,
                        value: copyJsonData,
                      });
                    }

                    getData();

                    setShowModal(false);
                  }}
                >
                  Add Board
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </VStack>
    </ScrollView>
  );
};

export default KanbanScreen;

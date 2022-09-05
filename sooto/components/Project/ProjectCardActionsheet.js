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
  NativeBaseProvider,
} from "native-base";

// Icons

import { FontAwesome } from "@expo/vector-icons";

const ProjectCardActionsheet = ({
  isOpen,
  onClose,
  onPressDelete,
  projectValue,
  setProjectValue,
  onPressEdit,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const valueNameChangeHandler = (text) => {
    setProjectValue({ ...projectValue, projectName: text });
  };

  const valueDescriptionChangeHandler = (text) => {
    setProjectValue({ ...projectValue, projectDescription: text });
  };

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() => setShowEditModal(true)}
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
              Edit Project
            </Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setShowDeleteModal(true);
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
              Delete Project
            </Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit Project</Modal.Header>
          <Modal.Body>
            <Stack space={5}>
              <FormControl isRequired>
                <FormControl.Label>Project Name</FormControl.Label>
                <Input
                  variant="underlined"
                  p={2}
                  placeholder="Name"
                  value={projectValue}
                  onChangeText={valueNameChangeHandler}
                />
                <FormControl.Label>Project Description</FormControl.Label>
                <TextArea
                  variant="underlined"
                  p={2}
                  placeholder="Description"
                  value={projectValue}
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
                  setShowEditModal(false);
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onPress={() => {
                  onPressEdit();
                  setShowEditModal(false);
                  onClose();
                }}
              >
                Edit Project
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Delete Project</Modal.Header>
          <Modal.Body>
            <VStack justifyContent="center" alignItems="center" space={5}>
              <Heading fontWeight="semibold" color="red.600">
                Delete Project?
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
                    onPressDelete();
                    onClose();
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  onPress={() => {
                    setShowDeleteModal(false);
                    onClose();
                  }}
                >
                  Cancel
                </Button>
              </Button.Group>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ProjectCardActionsheet;

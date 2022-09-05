import React, { useState, useEffect } from "react";
import {
  VStack,
  Button,
  Modal,
  FormControl,
  Input,
  TextArea,
  Select,
  Stack,
  CheckIcon,
  ScrollView,
  AddIcon,
  NativeBaseProvider,
} from "native-base";
import ProjectCard from "../components/Project/ProjectCard";
import {
  kanbanTemplate,
  noneTemplate,
  bulletLogsTemplate,
  eisenhowerMatrixTemplate,
} from "../data/templates/templates";

// Storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const ProjectsScreen = (props) => {
  // STATES
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = React.useState({});
  const [allProjects, setAllProjects] = useState([]);
  const [allProjectsInfo, setAllProjectsInfo] = useState([]);
  const [editProject, setEditProject] = useState({
    projectName: "",
    projectDescription: "",
  });

  useEffect(() => {
    !allProjects.length && getAllProjectKeys();
    console.log(allProjectsInfo);
    console.log(allProjects);
    return () => {};
  }, [allProjects]);

  useEffect(() => {}, [newProject]);

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
    setAllProjects([]);
    setAllProjectsInfo([]);
  };

  const storeProject = async ({ key, value }) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // error
      console.log(e);
    }
  };

  const getProject = async ({ key }) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // read error
      console.log(e);
    }

    console.log("Done.");
  };

  const getAllProjectKeys = async () => {
    var keys = [];
    let projectValues;
    try {
      keys = await AsyncStorage.getAllKeys();

      console.log("keys are " + keys);

      var projectKeys = keys.filter((key) => key.includes("project-"));
      // console.log(projectKeys);
      setAllProjects(projectKeys);
      // MULTI GET
      projectValues = await AsyncStorage.multiGet(projectKeys);
      // PARSE VALUES TO JSON FORMAT
      projectValues.forEach((project) => {
        project[1] = JSON.parse(project[1]);
      });
      // SET ALL PROJ
      setAllProjectsInfo(projectValues);
      console.log(projectValues);
    } catch (e) {
      // read key error
      console.log(e);
    }
    return;
  };

  return (
    <ScrollView>
      <VStack
        minH="100%"
        bg="white"
        flex={1}
        justifyContent="flex-start"
        alignItems="center"
        py={5}
        px={2}
        space={5}
      >
        {allProjectsInfo.length > 0
          ? allProjectsInfo.map((project, index) => {
              if (project.length >= 1) {
                const projectName = project[1]["projectName"];
                const projectId = project[0];
                return (
                  <ProjectCard
                    key={index}
                    onPress={() => {
                      props.navigation.navigate("Kanban", {
                        title: projectName,
                        projectId: projectId,
                        projectName: projectName,
                      });
                    }}
                    projectName={project[1]["projectName"]}
                    projectDescription={project[1]["projectDescription"]}
                    template={project[1]["template"]}
                    onPressDelete={() => {
                      if (projectId != null) {
                        console.log(projectId);
                        console.log(typeof projectId);
                        AsyncStorage.removeItem(projectId);
                        getAllProjectKeys();
                      }
                    }}
                    projectValue={editProject}
                    setProjectValue={setEditProject}
                    onPressEdit={() => {
                      if (project != null) {
                        var copyProject = project;

                        copyProject[1]["projectName"] = editProject.projectName;
                        copyProject[1]["projectDescription"] =
                          editProject.projectDescription;

                        console.log(project);
                        console.log(copyProject);

                        const jsonValue = JSON.stringify(copyProject[1]);
                        AsyncStorage.setItem(projectId, jsonValue);

                        //    storeProject({ key: projectId, value: copyProject });
                        getProject(projectId);
                        getAllProjectKeys();
                      }
                    }}
                  />
                );
              } else {
                return null;
              }
            })
          : null}
        <Button
          p={4}
          colorScheme="red"
          w="95%"
          leftIcon={<AddIcon />}
          onPress={() => setShowModal(true)}
        >
          Add Project
        </Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Add Project</Modal.Header>
            <Modal.Body>
              <Stack space={5}>
                <FormControl isRequired>
                  <FormControl.Label>Project Name</FormControl.Label>
                  <Input
                    variant="underlined"
                    p={2}
                    placeholder="Name"
                    onChangeText={(value) => {
                      setNewProject({ ...newProject, projectName: value });
                      console.log(newProject);
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Project Description</FormControl.Label>
                  <TextArea
                    variant="underlined"
                    p={2}
                    placeholder="Description"
                    onChangeText={(value) => {
                      setNewProject({
                        ...newProject,
                        projectDescription: value,
                      });
                      console.log(newProject);
                    }}
                  />
                  <FormControl.HelperText
                    _text={{
                      color: "red.600",
                      fontSize: "xs",
                    }}
                  >
                    *Paragraphs are not supported
                  </FormControl.HelperText>
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label>Kanban Template</FormControl.Label>
                  <Select
                    //  selectedValue="none"
                    variant="underlined"
                    placeholder="Select Template"
                    _selectedItem={{
                      // bg: "teal.600",
                      endIcon: <CheckIcon size={5} />,
                    }}
                    mt="1"
                    onValueChange={(itemValue) =>
                      setNewProject({ ...newProject, template: itemValue })
                    }
                  >
                    <Select.Item label="None" value="none" />
                    <Select.Item label="Normal Kanban" value="normalKanban" />
                    <Select.Item label="Bullet Logs" value="bulletLogs" />
                    <Select.Item
                      label="Eisenhower Matrix"
                      value="eisenhowerMatrix"
                    />
                  </Select>
                </FormControl>
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
                    const projectId = "project-" + id;

                    var tempProj;

                    // DEFAULT TO NONE
                    if (newProject.template == null) {
                      tempProj = {
                        ...newProject,
                        ...noneTemplate,
                        id: id,
                        template: "none",
                      };
                    } else if (newProject.template == "none") {
                      tempProj = {
                        ...newProject,
                        ...noneTemplate,
                        id: id,
                      };
                    } else if (newProject.template == "normalKanban") {
                      tempProj = {
                        ...newProject,
                        ...kanbanTemplate,
                        id: id,
                      };
                    } else if (newProject.template == "bulletLogs") {
                      tempProj = {
                        ...newProject,
                        ...bulletLogsTemplate,
                        id: id,
                      };
                    } else if (newProject.template == "eisenhowerMatrix") {
                      tempProj = {
                        ...newProject,
                        ...eisenhowerMatrixTemplate,
                        id: id,
                      };
                    }

                    console.log("TEMP PROJ BELOW");
                    console.log(tempProj);

                    setNewProject(tempProj);
                    storeProject({ key: projectId, value: tempProj });

                    getProject(projectId);
                    getAllProjectKeys();

                    setShowModal(false);
                  }}
                >
                  Add Project
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </VStack>
    </ScrollView>
  );
};

export default ProjectsScreen;

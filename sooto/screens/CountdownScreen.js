import React, { useState, useEffect } from "react";

import {
  Box,
  ScrollView,
  VStack,
  Button,
  AddIcon,
  Modal,
  FormControl,
  Input,
  Stack,
  NativeBaseProvider,
} from "native-base";
// Date time picker
import DateTimePicker from "@react-native-community/datetimepicker";
// Card
import CountdownCard from "../components/Countdown/CountdownCard";

// Storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const CountdownScreen = (props) => {
  // STATES
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [newCountdown, setNewCountdown] = React.useState({});
  const [allCountdowns, setAllCountdowns] = useState([]);
  const [allCountdownsInfo, setAllCountdownsInfo] = useState([]);

  const storeCountdown = async ({ key, value }) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getCountdown = async (key) => {
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

  const removeCountdown = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // error
      console.log(e);
    }

    console.log("Done.");
  };

  useEffect(() => {
    !allCountdowns.length && getAllCountdownKeys();
    console.log(allCountdownsInfo);
    console.log(allCountdowns);

    // return () => {};
  }, [allCountdowns]);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setNewCountdown((newCountdown) => ({
      ...newCountdown,
      date: currentDate,
    }));
  };

  const getAllCountdownKeys = async () => {
    var keys = [];
    let countdownValues;
    try {
      keys = await AsyncStorage.getAllKeys();

      var countdownKeys = keys.filter((key) => key.includes("countdown-"));

      setAllCountdowns(countdownKeys);
      // MULTI GET
      countdownValues = await AsyncStorage.multiGet(countdownKeys);
      // PARSE VALUES TO JSON FORMAT
      countdownValues.forEach((countdown) => {
        countdown[1] = JSON.parse(countdown[1]);
      });
      // SET ALL COUNTDOWN
      setAllCountdownsInfo(countdownValues);
      console.log(countdownValues);
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
        {allCountdownsInfo.length > 0
          ? allCountdownsInfo.map((countdown, index) => {
              if (countdown.length >= 1) {
                return (
                  <CountdownCard
                    key={index}
                    // onPress={() => {
                    //   const countdownName = countdown[1]["countdownName"];
                    //   const countdownId = countdown[0];
                    // }}
                    countdownName={countdown[1]["countdownName"]}
                    date={countdown[1]["date"] || new Date()}
                    now={new Date()}
                    handleDelete={() => {
                      const countdownKey = countdown[0];
                      removeCountdown(countdownKey);
                      getAllCountdownKeys();
                      console.log("delete pressed");
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
          Add Countdown
        </Button>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Add Countdown</Modal.Header>
            <Modal.Body>
              <Stack space={5}>
                <Box>
                  <FormControl.Label>Countdown Name</FormControl.Label>
                  <Input
                    variant="underlined"
                    p={2}
                    placeholder="Name"
                    onChangeText={(value) => {
                      setNewCountdown({
                        ...newCountdown,
                        countdownName: value,
                      });
                      console.log(newCountdown);
                    }}
                  />
                </Box>
                {/* <View style={{ width: "100%" }}> */}
                <DateTimePicker
                  style={{ width: 140 }}
                  value={date}
                  mode="date"
                  is24Hour={true}
                  onChange={onChangeDate}
                  display="default"
                  minimumDate={new Date()}
                />
                {/* </View> */}
              </Stack>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    clearAsyncStorage();
                    console.log("clear pressed");

                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onPress={() => {
                    const id = uuid.v4();
                    const countdownName = "countdown-" + id;
                    setNewCountdown((newCountdown) => ({
                      ...newCountdown,
                      id: id,
                      date: date,
                    }));

                    storeCountdown({
                      key: countdownName,
                      value: newCountdown,
                    });
                    getCountdown(countdownName);
                    getAllCountdownKeys();

                    setShowModal(false);
                  }}
                >
                  Add Countdown
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </VStack>
    </ScrollView>
  );
};

export default CountdownScreen;

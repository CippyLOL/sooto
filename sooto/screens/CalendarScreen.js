import React, { useState, useEffect } from "react";

import {
  Box,
  Text,
  ScrollView,
  VStack,
  FormControl,
  Input,
  Modal,
  Stack,
  Button,
  Heading,
  NativeBaseProvider,
} from "native-base";
import { Calendar } from "react-native-calendars";

// Storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import CalendarEventCard from "../components/Calendar/CalendarEventCard";

const CalendarScreen = (props) => {
  // STATES
  const [showModal, setShowModal] = useState(false);
  const [day, setDay] = useState(null);
  const [newEvent, setNewEvent] = React.useState({});
  const [allEvents, setAllEvents] = useState([]);
  const [allEventsInfo, setAllEventsInfo] = useState([]);

  const storeEvent = async ({ key, value }) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // error
      console.log(e);
    }
  };

  const getEvent = async ({ key }) => {
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

  const getAllEventKeys = async () => {
    var keys = [];
    let eventValues;
    var tempMarkedData;
    try {
      keys = await AsyncStorage.getAllKeys();

      console.log("keys are " + keys);

      var eventKeys = keys.filter((key) => key.includes("calendarEvent-"));

      setAllEvents(eventKeys);
      // MULTI GET
      eventValues = await AsyncStorage.multiGet(eventKeys);
      // PARSE VALUES TO JSON FORMAT
      eventValues.forEach((event) => {
        event[1] = JSON.parse(event[1]);
      });
      // SET ALL PROJ
      setAllEventsInfo(eventValues);
      console.log(eventValues);

      if (eventValues != []) {
        eventValues.forEach((event) => {
          const date = event[1].dateString;
          tempMarkedData[date] = {
            selected: true,
            selectedColor: "red",
          };
        });
      }
    } catch (e) {
      // read key error
      console.log(e);
    }
    return;
  };

  const removeEvent = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // error
      console.log(e);
    }

    console.log("Done.");
  };

  useEffect(() => {
    !allEvents.length && getAllEventKeys();
    console.log(allEventsInfo);
    console.log(allEvents);
    // return () => {};
  }, [allEvents]);

  useEffect(() => {}, [newEvent]);

  return (
    <ScrollView>
      <VStack
        minH="100%"
        bg="white"
        flex={1}
        justifyContent="flex-start"
        alignItems="center"
        py={5}
        space={2}
      >
        <Box w="100%" px={3}>
          <Calendar
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => {
              console.log("selected day", day);
              setDay(day);
              setShowModal(true);
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => {
              console.log("selected day", day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={"MMM yyyy"}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {
              console.log("month changed", month);
            }}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={(addMonth) => addMonth()}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
            style={{
              height: 350,
            }}
            theme={{
              monthTextColor: "red",
              todayTextColor: "#dc2626",
              arrowColor: "#dc2626",
            }}
          />
        </Box>

        <Heading fontSize="2xl" fontWeight="bold">
          Events
        </Heading>
        {allEventsInfo.length > 0
          ? allEventsInfo.map((event, index) => {
              if (event.length >= 1) {
                return (
                  <CalendarEventCard
                    key={index}
                    eventName={event[1].eventName}
                    dateString={event[1].dateString}
                    handleDelete={() => {
                      const eventKey = event[0];
                      removeEvent(eventKey);
                      getAllEventKeys();
                      console.log("delete pressed");
                    }}
                  />
                );
              } else {
                return null;
              }
            })
          : null}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Add Event</Modal.Header>
            <Modal.Body>
              <Stack space={5}>
                <Text>Date: {day != null ?? day.dateString}</Text>
                <FormControl isRequired>
                  <FormControl.Label>Add Event</FormControl.Label>
                  <Input
                    variant="underlined"
                    p={2}
                    placeholder="Event Name"
                    onChangeText={(value) => {
                      const tempEvent = { ...day, eventName: value };
                      setNewEvent({ ...tempEvent });
                      console.log(newEvent);
                    }}
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
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onPress={() => {
                    const id = uuid.v4();
                    const calendarEventId = "calendarEvent-" + id;
                    console.log("press add event");
                    console.log(newEvent);

                    if (newEvent != null) {
                      storeEvent({
                        key: calendarEventId,
                        value: { ...newEvent, id: id },
                      });
                      getEvent(calendarEventId);
                      getAllEventKeys();
                    }

                    setShowModal(false);
                  }}
                >
                  Add Event
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </VStack>
    </ScrollView>
  );
};

export default CalendarScreen;

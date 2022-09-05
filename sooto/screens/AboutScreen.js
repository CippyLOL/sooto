import React from "react";

import {
  Text,
  ScrollView,
  VStack,
  Heading,
  Divider,
  NativeBaseProvider,
  Link,
} from "native-base";

const AboutScreen = (props) => {
  return (
    <ScrollView>
      <VStack
        minH="100%"
        bg="white"
        flex={1}
        justifyContent="flex-start"
        alignItems="left"
        py={10}
        px={3}
        space={3}
      >
        <Heading fontWeight="bold">Project Templates</Heading>
        <Text>
          SOOTO provides 3 main kanban templates which are Normal Kanban, Bullet
          Log, and Eisenhower Matrix. Each template serves different purposes
          and functions that students can use to better manage their time in
          school.
        </Text>
        <Heading fontSize="lg" fontWeight="bold">
          Normal Kanban
        </Heading>
        <Text>
          Commonly used for Project Management. Students can adopt this menthod
          of transfering their tasks in a more visual manner to better allocate
          their time. The Kanban method ecourages users to focus on the tasks at
          hand and see how the tasks flow.
        </Text>
        <Text>
          To learn more check{" "}
          <Link
            _text={{ color: "red.500" }}
            href="https://kanbanize.com/kanban-resources/getting-started/what-is-kanban-board"
          >
            this article
          </Link>{" "}
          from Kanbanize.
        </Text>
        <Text>
          To learn more about creating a personal kanban check{" "}
          <Link
            _text={{ color: "red.500" }}
            href="https://www.wrike.com/blog/complete-guide-personal-kanban"
          >
            this article
          </Link>{" "}
          from Wrike.
        </Text>
        <Heading fontSize="lg" fontWeight="bold">
          Bullet Log
        </Heading>
        <Text>
          Inspired by the Bullet Journal method where they use Future Logs to
          foresee tasks that need be eventually done, whether the tasks is due
          in the short-term or long-term.
        </Text>
        <Text>
          To learn more about Bullet Journaling check{" "}
          <Link
            _text={{ color: "red.500" }}
            href="https://www.youtube.com/watch?v=o4kueYhGEc8"
          >
            this video
          </Link>{" "}
          from the official Bullet Journal channel.
        </Text>
        <Heading fontSize="lg" fontWeight="bold">
          Eisenhower Matrix
        </Heading>
        <Text>
          Effective for students to identify important and urgent tasks needed
          to be done or even help students realize some tasks are not imoportant
          or urgent and hence these tasks can be removed or deleted.
        </Text>
        <Text>
          To learn more check{" "}
          <Link
            _text={{ color: "red.500" }}
            href="https://asana.com/resources/eisenhower-matrix"
          >
            this article
          </Link>{" "}
          from Asana.
        </Text>
        <Heading fontSize="lg" fontWeight="bold">
          No Template
        </Heading>
        <Text>
          Students also have the freedom to create their own version of the
          Kanban board that fits their style and liking. Highly recommended to
          those who want a more personalized experience of the Kanban boards.
        </Text>
        <Divider />
        <Heading fontWeight="bold">Calendar</Heading>
        <Text>
          SOOTO provides a calendar where students can log upcomming events
          important to them such as school events, events outside of school or
          assignment deadlines and exams.
        </Text>
        <Divider />
        <Heading fontWeight="bold">Countdown</Heading>
        <Text>
          SOOTO enables students to add their countdowns for events they want to
          track such as upcomming exams and deadlines and logging their date.
        </Text>
        <Divider />
        <Heading fontWeight="bold">About SOOTO</Heading>
        <Text>
          This app was create by
          <Text bold> Gillianne Papasin (190428778) </Text>
          for UOL CM3070 Final Project Module.
        </Text>
      </VStack>
    </ScrollView>
  );
};

export default AboutScreen;

import { Heading, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";

const Home: React.FC = () => (
  <Stack direction="column" margin="auto" padding={10}>
    <Heading mb={4}>Welcome to the App</Heading>
    <Text fontSize="xl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vestibulum
      massa vitae tortor mollis vehicula. In hac habitasse platea dictumst.
      Quisque sed nulla blandit, laoreet dui et, consectetur lorem. Suspendisse
      potenti. Sed quis maximus orci, a tempor dolor. Vestibulum nulla dui,
      aliquam in dui eu, mollis tempor ipsum. Donec id erat sagittis sem
      ultrices mollis et non dui. Maecenas vitae velit at libero cursus posuere
      placerat at dui. Nullam euismod, magna sed congue pellentesque, magna elit
      molestie nisl, non dignissim lectus enim et elit. Cras eu risus rutrum,
      accumsan lacus id, blandit tortor. Nullam volutpat fermentum mollis. Morbi
      vel faucibus lectus, non blandit sapien. Nulla commodo, ex quis mollis
      laoreet, elit nulla tincidunt lacus, in suscipit felis augue nec risus.
      Aliquam ultrices erat vel hendrerit dignissim.
    </Text>
  </Stack>
);

export default Home;

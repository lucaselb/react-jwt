import {
  Button,
  Center,
  Input,
  Stack,
  Text,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import api from "../api";

interface Form extends HTMLFormElement {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

const Login: React.FC = () => {
  const history = useHistory();
  const toast = useToast();

  const submitLogin = (event: React.FormEvent<Form>) => {
    event.preventDefault();

    api
      .loginUser(
        event.currentTarget.username.value.trim(),
        event.currentTarget.password.value.trim()
      )
      .then((data) => {
        localStorage.setItem("x-access-token", data.token);
        localStorage.setItem(
          "x-access-token-expiration",
          (Date.now() + 2 * 60 * 60 * 1000).toString()
        );
        localStorage.setItem("username", data.username);

        toast({
          title: "Login Successfully.",
          description: "We're redirecting you to the home page.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Stack direction="column" margin="auto">
      <Center w="100vw">
        <Stack
          direction="column"
          spacing={5}
          padding={5}
          border="1px"
          borderColor="gray.200"
          borderRadius="5px"
        >
          <form onSubmit={submitLogin}>
            <FormControl isRequired>
              <Stack>
                <Text mt={4} margin="auto" fontWeight="500" fontSize="lg">
                  Login
                </Text>
                <FormLabel>Username</FormLabel>
                <Input name="username" />
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" />
                <Button colorScheme="blue" type="submit">
                  Login
                </Button>
              </Stack>
            </FormControl>
          </form>
        </Stack>
      </Center>
    </Stack>
  );
};

export default Login;

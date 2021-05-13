import {
  Button,
  Center,
  Input,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Heading,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import User from "../types/user";

interface Form extends HTMLFormElement {
  fullname: HTMLInputElement;
  username: HTMLInputElement;
  password: HTMLInputElement;
}

const SignUp: React.FC = () => {
  const [user, setUser] = React.useState<User>();
  const history = useHistory();
  const toast = useToast();

  const submitRegister = (event: React.FormEvent<Form>) => {
    event.preventDefault();
    const userData: User = {
      fullname: event.currentTarget.fullname.value.trim(),
      username: event.currentTarget.username.value.trim(),
      password: event.currentTarget.password.value.trim(),
      created_at: new Date().toISOString(),
    };

    setUser(userData);

    api
      .registerUser(userData)
      .then((data) => {
        toast({
          title: "Account created successfully.",
          description: "We're redirecting you to the login page.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setTimeout(() => {
          history.push("/login");
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
          <form onSubmit={submitRegister}>
            <FormControl isRequired>
              <Stack>
                <Text mt={4} margin="auto" fontWeight="500" fontSize="lg">
                  Sign Up
                </Text>
                <FormLabel>Full name:</FormLabel>
                <Input name="fullname" />
                <FormLabel>Username</FormLabel>
                <Input name="username" />
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" />
                <Button colorScheme="blue" type="submit">
                  Register
                </Button>
              </Stack>
            </FormControl>
          </form>
        </Stack>
      </Center>
    </Stack>
  );
};

export default SignUp;

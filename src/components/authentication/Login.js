import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, updateIsLoading] = useState(false);
  const [show, updateShow] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const {user,setUser} = ChatState()

  const handleClick = () => {
    updateShow(!show);
  };

  const submitHandler = async () => {
    updateIsLoading(true);
    // Call API here to login with the email and password
    if(!email || !password) {
      toast({
        title: 'Field/s cannot be empty',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      updateIsLoading(false);
      return;
    }
    const config = {
      headers : {
        "content-type" : "application/json",
      }
    }
    try {
      const {data} = await axios.post("/api/user/login", {
        email,
        password
      }, config);

      localStorage.setItem("user-info", JSON.stringify(data));
      updateIsLoading(false);

      navigate('/chats', {replace : true});
    } catch(err) {
      updateIsLoading(false);
      toast({
        title: 'Login failed due to some technical issue',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log(`Error occured while loging user : Error ${err}`);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel 
        // textColor="white"
        >Email</FormLabel>
        <Input
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel
        //  textColor="white"
         >Passoword</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter passowrd"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InputRightElement
            width="5.rem"
            marginRight="10px"
            onClick={handleClick}
          >
            {show ? (
              <ViewIcon boxSize="24px" />
            ) : (
              <ViewOffIcon boxSize="24px" />
            )}
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        width="100%"
        style={{ marginTop: "15px" }}
        onClick={submitHandler}
        background="#bee3f8"
        isLoading= {isLoading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;

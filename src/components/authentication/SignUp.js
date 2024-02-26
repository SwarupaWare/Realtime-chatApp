import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Button,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from '@chakra-ui/react'
import React, { useState } from "react";
import axios from "axios";
import {validateEmail, validatePassword} from '../../helper/userDetailsValidator';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState();
  const [show, updateShow] = useState(false);
  const [isLoading, updateIsLoading] = useState(false);

  const [nameValid, updateNameValid] =  useState(true);
  const [emailValid, updateEmailValid] =  useState(true);
  const [passowrdValid, updatePasswordValid] =  useState(true);

  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    updateShow(!show);
  };

  const postDetails = (pics) => {
    if(pics === undefined) {
      toast({
        title: 'Please select image',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    } 
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      setPic(pics);
      toast({
        title: 'Pic uploaded successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const isValidString = (field, value="") => {
    if (!value || (value && value.length === 0)) {
      return false;
    } 
    switch (field) {
      case "name": {
        return true;
      }
      case "email": {
        return validateEmail(value);        
      }
      case "password": {
        return validatePassword(value);
      }
    }
  }

  const onNameChangeHandler = (e) => {
    const name = e.target.value || "";
    updateNameValid(isValidString("name", name));
    setName(name);
  }

  const onEmailChangeHandler = (e) => { 
    const email = e.target.value || "";
    updateEmailValid(isValidString("email", email));
    setEmail(email);
  }

  const onPasswordChangeHandler = (e) => {
    const passwordValue = e.target.value || "";
    updatePasswordValid(isValidString("password", passwordValue));
    setPassword(passwordValue);
  }

  const submitHandler = async () => {
    updateIsLoading(true);
    if (!name || !email || !password) {
      toast({
        title: 'Field/s cannot be empty',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      updateIsLoading(false);
      return;
    }
    try {
      const config = {
        headers : {
          "content-type" : "multipart/form-data",
        }
      }

      const {data} = await axios.post("/api/user", 
      {name, email, password, pic}, config);
      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem("user-info", JSON.stringify(data));
      updateIsLoading(false);
      navigate('/chats', {replace : true});
    } catch(error) {
      updateIsLoading(false);
      toast({
        title: 'Registration failed due to some technical issue',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log(`Error occured while signing user : Error ${error}`);
    }

  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel 
        // textColor="white"
        >Name</FormLabel>
        <Input
          placeholder="Enter name"
          isInvalid = {!nameValid}
          onChange={onNameChangeHandler}
        ></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel 
        // textColor="white"
        >Email</FormLabel>
        <Input
          placeholder="Enter email"
          isInvalid = {!emailValid}
          onChange={onEmailChangeHandler}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel 
        // textColor="white"
        >Passoword</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter passowrd"
            isInvalid = {!passowrdValid}
            onChange={onPasswordChangeHandler}
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

      <FormControl id="pic">
        <FormLabel 
        // textColor="white"
        >Upload profile picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        ></Input>
      </FormControl>

      <Button
        width="100%"
        style={{ marginTop: "15px" }}
        onClick={submitHandler}
        background="#bee3f8"
        isLoading={isLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;

import React, { useEffect } from "react";
import { Box, Container, Tabs, Text, TabList, TabPanel, Tab, TabPanels } from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";
import { useNavigate } from "react-router-dom";
import {ChatState} from "../context/ChatProvider";

const HomePage = () => {

  const navigate = useNavigate();

  const {user,setUser} = ChatState();

  useEffect(()=> {
      const userData = localStorage.getItem("user-info")
      const userInfo = userData ? JSON.parse(userData) : undefined;
      setUser(userInfo);
      if(userInfo){
          navigate("/chats",{replace: true});
      } else {
        navigate("/",{replace: true});
      }
  }, [navigate]);


  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" align="center" 
        // color="white"
        >
          Chat App
        </Text>
      </Box>
      <Box w="100%" borderRadius="lg" borderWidth="1px" p={3}>
        <Tabs variant="soft-rounded" >
          <TabList mb="1em">
            <Tab width="50%" 
            // color="white"
            >Login</Tab>
            <Tab width="50%" 
            // color="white"
            >Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;

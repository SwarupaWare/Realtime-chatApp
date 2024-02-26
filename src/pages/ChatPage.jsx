import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import { Box, HStack } from '@chakra-ui/react';
import SideDrawer from '../components/chats/SideDrawer';
import MyChats from '../components/chats/MyChats';
import ChatBox from '../components/chats/ChatBox';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const {user} = ChatState();
  const navigate = useNavigate();
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(()=>{
    if(!user) {
      navigate("/", {replace: true});
    } 
  }, [navigate])
 
  return (
    <div style={{width : "100%", height:"100%"}} id="chat_page">
      {user && <SideDrawer id="cp_child1"/>}
      <Box display="flex" justifyContent="space-around" w="100%" h="100%"  p="10px"  id="cp_child2" flexDirection="row"> 
    
      {user && <MyChats fetchAgain={fetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      
      </Box>
    </div>
  )
}

export default ChatPage;
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuItem,
  MenuButton,
  HStack,
  MenuList,
  Avatar,
  MenuDivider,
  Drawer,
  DrawerFooter,
  DrawerBody,
  useDisclosure,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerOverlay,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "../authentication/ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "../users/UserListItem";
import { getSender } from "../../helper/ChatHelper";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  

  const { user, chats, setChats, setSelectedChat, notification,
    setNotification, } = ChatState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onLogoutBtnClick = () => {
    navigate("/", { replace: true });
    localStorage.removeItem("user-info");
  };



  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      // the selected user for chat is already present in our state then will append that chat only
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="3px"
        fd="column"
        id="SideDrawer1"
      >
        <HStack direction={['column', 'row']} spacing="700px">
          <Tooltip label="Search user" hasArrow placement="bottom">
            <Button variant="ghost" onClick={onOpen}>
              <i class="fa-solid fa-magnifying-glass"></i>
              <Text d={{ base: "none", md: "flex" }} px={4} 
              // textColor="white"
              >
                Search User
              </Text>
            </Button>
          </Tooltip>
          <Text fontSize="2xl" fontFamily="Work sans" 
          // textColor="white"
          >
            Chat Application
          </Text>
          <div>
            <Menu>
              <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
                <BellIcon fontSize="2xl" m={1} />
              </MenuButton>
              <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user.name}
                  src={user.pic}
                />
              </MenuButton>
              <MenuList>
                <ProfileModal user={user}>
                  <MenuItem>My Profile</MenuItem>
                </ProfileModal>
                <MenuDivider />
                <MenuItem onClick={onLogoutBtnClick}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </HStack>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
         
          <DrawerHeader>Search users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}

              />
              <Button 
              onClick={handleSearch}
              >Go</Button>
            </Box>

            {loading? <ChatLoading/>
            :(
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}

            {loadingChat && <Spinner ml="auto" d="flex" />}
            </DrawerBody>      
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;

// import { useNavigate } from "react-router-dom";

const { createContext, useContext, useState, useEffect } = require("react");

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

//   const navigate = useNavigate();

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("user-info"));
  //   setUser(userInfo);
  //   // if (!userInfo) {
  //   //   navigate("/");
  //   // }
  // }, []);

  return (
    <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification}}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

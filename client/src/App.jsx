import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState, idState, roomState } from "./recoil/atom";

import {
  Box,
  Flex,
  Avatar,
  Text,
  Badge,
  Button,
  Input,
} from "@chakra-ui/react";
import { TimeIcon, CheckIcon } from "@chakra-ui/icons";
// import MessageBox from "./components/MessageBox";

import "./App.css";

import { io } from "socket.io-client";
import SideMenu from "./components/SideMenu";

const socket = io("http://localhost:4000");

function App() {
 const [message, setMessage] = useState("");
 const [messages, setMessages] = useState([]);
 const [username, setUsername] = useRecoilState(userState);
 const [userId, setUserId] = useRecoilState(idState);
 const [users, setUsers] = useState([]);
 const [room, setRoom] = useRecoilState(roomState);
 const [rooms, setRooms] = useState([]);


  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    socket.on("connection", (data) => {
      console.log("server is connected");
      setRooms(data.rooms);
      setUsers(data.users);
    
    });
 

    socket.on("sentMessage", (data) => {
      setMessages(data);
      console.log(data);
    });
 

    return () => socket.off();
  }, []);

  //Handle message

  const handleMessage = (message) => {
    socket.emit("chatMessage", {
      message: message,
      user_id: userId,
      username: username,
      avatar: "https://bit.ly/sage-adebayo",
      room: room,
    });
  };

  console.log(messages);

  return (
    <div className="App">
      <header className="App-header">
        <Flex w="100%" h="70vh" direction="row" bg="#E6DAF5" m="5%">
          <SideMenu />

          <Flex
            p="4"
            borderBottom="0.5px solid  #a88beb"
            borderRadius="0px 0px 20px 20px"
            w="70%"
            h="70vh"
            direction="column"
          >
            <Box ml="3" p="10px 0px 10px 0px">
              <Avatar alignItems="left" src="https://bit.ly/sage-adebayo" />
              <Text
                fontWeight="bold"
                color="#180B28"
                fontSize="1rem"
                textAlign="left"
              >
                Segun Adebayo
                <Badge ml="1" colorScheme="green">
                  online
                </Badge>
              </Text>
              <Text fontSize="sm" color="#746C80" textAlign="left">
                UI Engineer{" "}
              </Text>
            </Box>

            <Flex
              direction="column"
              bg="rgba( 255, 255, 255, 0.25 )"
              box-shadow="0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"
              backdrop-filter="blur( 4px )"
              border-radius="40px"
              border="1px solid rgba( 255, 255, 255, 0.18 )"
            >
              {messages.map((message) => {
                return(
                <Flex
                m="2%"
                bg="#180B28"
                alignSelf="alignSelf"
                direction="column"
                borderRadius="6px 6px 6px 6px"
                w="50%"
                key={message.id}
              >
                <Box p="4">
                  <Flex direction="row">
                    <Avatar   src={message.avatar} h="1em" w="1em" />
                    <Box ml="3">
                    <Text fontSize="sm" color="white">{message.username}</Text>
                      <Text fontSize="sm" color="white">
                        {message.message}
                      </Text>
                    </Box>
                  </Flex>
                  <Box textAlign="right">
                    <TimeIcon h="0.5em" w="0.5em" />
                    <CheckIcon h="0.5em" w="0.5em" />
                  </Box>
                </Box>
              </Flex> )
              })}
              <Input
                color="#180B28"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></Input>
              <Button
                onClick={() => {
                  handleMessage(message);
                  setMessage("");
                }}
                colorScheme="purple"
              >
                Send
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </header>
    </div>
  );
}

export default App;

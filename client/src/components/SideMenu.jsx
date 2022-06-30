import { useState, useEffect, React } from "react";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");
import {
  Box,
  Flex,
  Tag,
  TagLabel,
  Avatar,
  Text,
  Badge,
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  AvatarGroup,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { userState, idState, roomState } from "../recoil/atom";


function SideMenu() {
  const [user, setUser] = useRecoilState(userState);
  const [userId, setUserId] = useRecoilState(idState);
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useRecoilState(roomState);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // here we can use socket events and listeners

    socket.on("created", (data) => {
      setUserId(data.id);
      console.log(data);
    });
    socket.on("allUsers", (data) => {
      setUsers(data);
      console.log(data);
    });
    socket.on("createRoom", (data) => {
      console.log(data);
    });
    socket.on("allRooms", (data) => {
      setRooms(data);
      console.log(data);
    });
    socket.on("deleteRoom", (data) => {
      setRooms(data);
      console.log(data);
    });
  }, []);

  const handleUser = (username) => {
    socket.emit("create", username);
    setUser(username);
    console.log(user);
  };

  const handleRooms = (room_name) => {
    socket.emit("createRoom", room_name);
    setRoom(room_name);
    console.log(room);
  };

  const handleDelete = (room_name) => {
    socket.emit("deleteRoom", room_name);
    console.log(room);
  };

  const handleJoin = (room_name) => {
    socket.emit("joinRoom", room_name);
    setRoom(room_name);
    console.log(room);
  };

  useEffect(() => {
    setOverlay(<OverlayOne />);
    onOpen(overlay);
  }, []);

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [overlayTwo, setOverlayTwo] = useState(<OverlayTwo />);
console.log(userId);
  return (
    <Flex w="30%" h="70vh" direction="column" p="4">
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Welcome to the chatroom!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="email">Create a name</FormLabel>
              <Input
                autoComplete="off"
                id="name"
                type="username"
                onChange={(e) => {
                  setUser(e.target.value);
                }}
              />
              <FormHelperText>Your name is your uniqness.</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                handleUser(user);
                onClose();
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Text fontWeight="bold" color="#180B28" fontSize="1rem" textAlign="left">
        All rooms
      </Text>
      <Box
        bg="rgba( 255, 255, 255, 0.25 )"
        box-shadow="0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"
        backdrop-filter="blur( 4px )"
        border-radius="40px"
        border="1px solid rgba( 255, 255, 255, 0.18 )"
        h="70vh"
        p="4"
      >
        {users.map((user) => {
          return (
            <Tag size="lg" colorScheme="gray" borderRadius="full" key={user.id}>
              <Avatar
                src="https://bit.ly/sage-adebayo"
                size="xs"
                name=""
                ml={-1}
                mr={2}
              />
              <TagLabel>{user.username}</TagLabel>
              <Badge ml="1" colorScheme="green">
                online
              </Badge>
            </Tag>
          );
        })}

        <ButtonGroup
          colorScheme="purple"
          size="sm"
          isAttached
          variant="outline"
          display="flex"
        >
          <Button
            ml="4"
            onClick={() => {
              setOverlayTwo(<OverlayTwo />);
              onOpen();
            }}
          >
            Create a new room
          </Button>
          <IconButton aria-label="Add new chat rooms" icon={<AddIcon />} />
        </ButtonGroup>

        {rooms.map((room) => {
          return (
            <ButtonGroup
              colorScheme="blackAlpha"
              size="sm"
              isAttached
              variant="outline"
              display="flex"
              key={room.id}
            >
              <AvatarGroup size="xs" max={2}>
                <Avatar
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                />
                <Avatar
                  name="Segun Adebayo"
                  src="https://bit.ly/sage-adebayo"
                />
                <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                <Avatar
                  name="Prosper Otemuyiwa"
                  src="https://bit.ly/prosper-baba"
                />
                <Avatar
                  name="Christian Nwamba"
                  src="https://bit.ly/code-beast"
                />
              </AvatarGroup>
              <Button ml="4">{room.room_name}</Button>
              <IconButton aria-label="Add to chat rooms" icon={<AddIcon />} onClick={() => {
                handleJoin(room.room_name);
            
              }} />
              <IconButton
                aria-label="Delete chat rooms"
                icon={<DeleteIcon />}
                onClick={() => {
                  handleDelete(room.room_name);
                }}
              />
            </ButtonGroup>
          );
        })}

        <Modal isCentered isOpen={isOpen && userId} onClose={onClose}>
          {overlayTwo}
          <ModalContent>
            <ModalHeader>Create a chat-room name!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel htmlFor="email">
                  Create a name for the room!
                </FormLabel>
                <Input
                  autoComplete="off"
                  id="name"
                  type="room_name"
                  onChange={(e) => {
                    setRoom(e.target.value);
                  }}
                />
                <FormHelperText>Your name is your uniqness.</FormHelperText>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  handleRooms(room);
                  onClose();
                }}
              >
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}

export default SideMenu;

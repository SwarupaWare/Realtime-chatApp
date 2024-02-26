import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Image,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon=<ViewIcon /> onClick={onOpen} />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            textColor="black"
            display="flex"
            flexFlow="column"
            justifyContent="center"
            alignItems="center"
          >
            Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexFlow="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              borderRadius="full"
              boxSize="130px"
              src={user.pic}
              alt={user.name}
            />

            <Text fontSize="22px" fontFamily="Work sans" textColor="black">
              Email: {user.email}
            </Text>
            <Text
              fontSize="22px"
              fontFamily="Work sans"
              textColor="black"
              textAlign="left"
            >
              User: {user.name}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button background="#bee3f8" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileModal;

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import RangeSelector from "../RangeSelector";
import { FaCalendar } from "react-icons/fa6";

export default function NavbarRangeModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>
        <FaCalendar />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose date</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RangeSelector />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              <Text>Close</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

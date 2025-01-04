import {
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Modal,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";

interface DeleteModalProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  callback: () => void;
}

export default function DeleteModal({
  title,
  description,
  children,
  callback,
}: DeleteModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = async () => {
    await callback();
  };

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {description ||
                `Are you sure? You can't undo this action afterwards.`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                <Text>Cancel</Text>
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                <Text> Delete</Text>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </Modal>
    </>
  );
}

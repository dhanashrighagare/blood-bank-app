// components/NotificationPopup.js
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, IconButton, Box } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';

const NotificationPopup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      {/* IconButton to open the modal */}
      <IconButton 
        icon={<BellIcon />} 
        onClick={onOpen} 
        colorScheme="blue" 
        aria-label="Show Notifications"
      />

      {/* Modal Component */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notification Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>This is the content of the notification popup!</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default NotificationPopup;

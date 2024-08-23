"use client";

import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button as ChakraButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/app/components/adminsidebar';
import API from '../utils/axiosInstance';
import NotificationPopup from '@/app/notificationpopup/page';

const DonorHistoryList = () => {
  const [donorHistories, setDonorHistories] = useState([]);
  const [deletingHistoryId, setDeletingHistoryId] = useState(null);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

  useEffect(() => {
    // Fetch donor histories from the API
    const fetchDonorHistories = async () => {
      try {
        const response = await API.get('/donors/get-all-donor-histories');
        if (response.data.success) {
          setDonorHistories(response.data.histories);
        } else {
          console.error('Failed to fetch donor histories:', response.data.message);
          setError('Failed to fetch donor histories');
        }
      } catch (error) {
        console.error('Error fetching donor histories:', error);
        setError('Error fetching donor histories');
      }
    };

    fetchDonorHistories();
  }, []);

  const handleDelete = async () => {
    try {
      await API.delete(`/donors/delete-donor-history/${deletingHistoryId}`);
      setDonorHistories(donorHistories.filter(history => history._id !== deletingHistoryId));
      onConfirmClose();
    } catch (error) {
      console.error('Error deleting donor history:', error);
      setError('Error deleting donor history');
    }
  };

  const openConfirmDialog = (id) => {
    setDeletingHistoryId(id);
    onConfirmOpen();
  };

  return (
    <Flex>
      <AdminSidebar />
      <Box ml="16%" width="84%" p={6}>
        {/* Navbar */}
        <Box p={3} bg="white" shadow="md" borderRadius="md">
          <Flex align="center" justify="space-between">
            <Heading mb={4} ml={7} textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">
              Donor History List
            </Heading>
            <Flex align="center">
              {/* Notification Popup */}
              <NotificationPopup isOpen={isOpen} onClose={onClose} />
              <Box mx={3} />
              {/* Add Donor History Button */}
              <NextLink href="/createdonorhistory" passHref>
                <Button colorScheme="teal" size="sm" mr={3} h={10}>
                  Add Donor History
                </Button>
              </NextLink>
            </Flex>
          </Flex>
        </Box>

        {/* Donor History List Content */}
        <Box mt={6} ml={3}>
          {error && (
            <Box p={4} color="red.500">
              {error}
            </Box>
          )}
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Donation Date</Th>
                <Th>Amount</Th>
                <Th>Notes</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {donorHistories.map((history) => (
                <Tr key={history._id}>
                  <Td>{history._id}</Td>
                  <Td>{new Date(history.donationDate).toLocaleDateString()}</Td>
                  <Td>{history.amount}</Td>
                  <Td>{history.notes}</Td>
                  <Td>
                    <NextLink href={`edithistory/${history._id}`} passHref>
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        colorScheme="blue"
                        size="sm"
                        mr={4}
                      />
                    </NextLink>
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => openConfirmDialog(history._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      {/* Confirmation Dialog */}
      <Modal isOpen={isConfirmOpen} onClose={onConfirmClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this donor history record?
          </ModalBody>
          <ModalFooter>
            <ChakraButton colorScheme="blue" mr={3} onClick={onConfirmClose}>
              Cancel
            </ChakraButton>
            <ChakraButton colorScheme="red" onClick={handleDelete}>
              Delete
            </ChakraButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default DonorHistoryList;

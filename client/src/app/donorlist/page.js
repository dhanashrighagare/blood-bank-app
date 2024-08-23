"use client";

import { Box, Flex, Heading, Table, Thead, Tbody, Tr, Th, Td, IconButton, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button as ChakraButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/app/components/adminsidebar';
import Logout from '@/app/logout/page';
import API from '../utils/axiosInstance'; 
import NotificationPopup from '@/app/notificationpopup/page';

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [deletingDonorId, setDeletingDonorId] = useState(null); 
  const { isOpen,  onClose } = useDisclosure(); 
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure(); 

  useEffect(() => {
    // Fetch donors from the API
    const fetchDonors = async () => {
      try {
        const response = await API.get('/donors/get-all-donors');
        if (response.data.success) {
          setDonors(response.data.donors);
        } else {
          console.error('Failed to fetch donors:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };
  
    fetchDonors();
  }, []);  

  const handleDelete = async () => {
    try {
      await API.delete(`/donors/delete-donor/${deletingDonorId}`);
      setDonors(donors.filter(donor => donor._id !== deletingDonorId));
      onConfirmClose(); // Close the confirmation dialog
    } catch (error) {
      console.error('Error deleting donor:', error);
    }
  };

  const openConfirmDialog = (id) => {
    setDeletingDonorId(id); // Set the ID of the donor to delete
    onConfirmOpen(); // Open the confirmation dialog
  };

  return (
    <Flex>
      <AdminSidebar />
      <Box ml="16%" width="84%" p={6}>
        {/* Navbar */}
        <Box p={3} bg="white" shadow="md" borderRadius="md">
          <Flex align="center" justify="space-between">
            <Heading mb={4} ml={7} textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">
              Donor List
            </Heading>
            <Flex align="center">
              {/* Notification Popup */}
              <NotificationPopup isOpen={isOpen} onClose={onClose} />
              <Box mx={3} />
              {/* Add Donor Button */}
              <NextLink href="/adddonor" passHref>
                <Button colorScheme="teal" size="sm" mr={3} h={10}>
                  Add Donor
                </Button>
              </NextLink>
              {/* Logout Button */}
              <Logout />
            </Flex>
          </Flex>
        </Box>

        {/* Donor List Content */}
        <Box mt={6} ml={3}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th> 
                <Th>Address</Th>
                <Th>Phone</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {donors.map((donor) => (
                <Tr key={donor._id}>
                  <Td>{donor._id}</Td>
                  <Td>{donor.name}</Td>
                  <Td>{donor.address}</Td>
                  <Td>{donor.phone}</Td>
                  <Td>
                    <NextLink href={`editdonor/${donor._id}`} passHref>
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
                      onClick={() => openConfirmDialog(donor._id)}
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
            Are you sure you want to delete this donor? 
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

export default DonorList;

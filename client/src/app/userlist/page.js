"use client";

import { useState, useEffect } from 'react';
import { Box, Button, Flex, Heading, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button as ChakraButton } from '@chakra-ui/react';
import { BellIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import API from '../utils/axiosInstance';
import AdminSidebar from '@/app/components/adminsidebar';
import { useRouter } from 'next/navigation';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get('/users/list');
        setUsers(response.data.users);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch user list',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchUsers();
  }, [toast]);

  const handleDelete = async () => {
    try {
      await API.delete(`/users/${deletingUserId}`);
      setUsers(users.filter(user => user._id !== deletingUserId));
      toast({
        title: 'Success',
        description: 'User deleted successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openConfirmDialog = (userId) => {
    setDeletingUserId(userId);
    onOpen();
  };

  const handleEdit = (userId) => {
    router.push(`/users/update-role/${userId}`); 
  };

  return (
    <Flex>
      <AdminSidebar />
      <Box ml="16%" width="84%" p={6}>
        <Box p={3} bg="white" shadow="md" borderRadius="md">
          <Flex align="center" justify="space-between">
            <Heading mb={4} ml={4}>User List</Heading>
            <Flex align="center">
              <BellIcon boxSize={8} mr={6} color="gray.600" />
              <Button colorScheme="red">Logout</Button>
            </Flex>
          </Flex>
        </Box>

        <Box mt={6} ml={3}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>User ID</Th>
                <Th>Role</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Address</Th>
                <Th>Phone</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user._id}</Td>
                  <Td>{user.role}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.address}</Td>
                  <Td>{user.phone}</Td>
                  <Td>
                    <IconButton 
                      icon={<EditIcon />} 
                      aria-label="Edit" 
                      colorScheme="blue" 
                      onClick={() => handleEdit(user._id)} 
                      mr={2}
                    />
                    <IconButton 
                      icon={<DeleteIcon />} 
                      aria-label="Delete" 
                      colorScheme="red" 
                      onClick={() => openConfirmDialog(user._id)} 
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this user?
          </ModalBody>
          <ModalFooter>
            <ChakraButton colorScheme="blue" mr={3} onClick={onClose}>
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

export default UserList;

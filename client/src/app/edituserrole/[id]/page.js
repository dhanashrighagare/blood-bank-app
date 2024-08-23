"use client";

import { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Select, useToast, Flex, Heading, VStack } from '@chakra-ui/react';
import API from '../utils/axiosInstance';
import AdminSidebar from '@/app/components/adminsidebar';
import { EditIcon, BellIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const EditUserRolePage = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const toast = useToast();
  const router = useRouter();
  const { userId } = useParams(); // Ensure this is how you're extracting the userId

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get(`/users/${userId}`);
        if (response.data.success) {
          setUser(response.data.user);
          setRole(response.data.user.role);
        } else {
          toast({
            title: 'Error',
            description: response.data.message || 'Failed to fetch user',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message || 'Error fetching user',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId, toast]);

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put(`/users/${userId}/update-role`, { role });
      if (response.data.success) {
        toast({
          title: 'Success',
          description: response.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/userlist');
      } else {
        toast({
          title: 'Error',
          description: response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while updating the user role.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!user) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Box>Loading...</Box>
      </Flex>
    );
  }

  return (
    <Flex>
      <AdminSidebar />
      <Box ml="16%" width="84%" p={6}>
        <Box p={3} bg="white" shadow="md" borderRadius="md">
          <Flex align="center" justify="space-between">
            <Heading mb={4} ml={4}>Edit User Role</Heading>
            <Flex align="center">
              <BellIcon boxSize={8} mr={6} color="gray.600" />
              <Button colorScheme="red">Logout</Button>
            </Flex>
          </Flex>
        </Box>

        <Box mt={6} ml={4} p={6} bg="gray.100" borderRadius="md" shadow="md">
          <VStack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="role">Role</FormLabel>
              <Select id="role" value={role} onChange={handleChange}>
                <option value="Admin">Admin</option>
                <option value="Donor">Donor</option>
                <option value="Hospital">Hospital</option>
                <option value="Organization">Organization</option>
              </Select>
            </FormControl>
            <Button 
              colorScheme="blue" 
              leftIcon={<EditIcon />} 
              onClick={handleSubmit}
              width="full"
            >
              Update Role
            </Button>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default EditUserRolePage;

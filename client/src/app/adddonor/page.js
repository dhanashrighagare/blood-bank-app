"use client";

import { useState } from 'react';
import { Box, Button, Input, Textarea, FormControl, FormLabel, useToast, Flex, Heading, VStack } from '@chakra-ui/react';
import AdminSidebar from '@/app/components/adminsidebar';
import { AddIcon, BellIcon } from '@chakra-ui/icons';
import API from '../utils/axiosInstance';
import { useRouter } from 'next/navigation'; 

const AddDonor = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });

  const toast = useToast();
  const router = useRouter(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/donors/add-donor', formData);

      toast({
        title: 'Success',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      router.push('/donorlist'); 

      // Clear form fields
      setFormData({
        name: '',
        address: '',
        phone: '',
        email: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'An error occurred while adding the donor.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex>
      <AdminSidebar />
      <Box ml="16%" width="84%" p={6}>
        {/* Navbar */}
        <Box p={3} bg="white" shadow="md" borderRadius="md">
          <Flex align="center" justify="space-between">
            <Heading mb={4} ml={7} textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">Add New Donor</Heading>
            <Flex align="center">
              {/* Notification Icon */}
              <BellIcon boxSize={8} mr={6} color="gray.600" />
              {/* Logout Button */}
              <Button colorScheme="red">Logout</Button>
            </Flex>
          </Flex>
        </Box>

        <Box mt={2} ml={4} p={6} height="89%" bg="gray.100" shadow="lg" borderRadius="md">
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <FormControl id="name" isRequired>
                <FormLabel color="gray.600" fontWeight="semibold">Name</FormLabel>
                <Input
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  bg="white"
                  color="gray.800"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                  borderRadius="md"
                  padding={4}
                />
              </FormControl>

              <FormControl id="address" isRequired>
                <FormLabel color="gray.600" fontWeight="semibold">Address</FormLabel>
                <Input
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  bg="white"
                  color="gray.800"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                  borderRadius="md"
                  padding={4}
                />
              </FormControl>

              <FormControl id="phone" isRequired>
                <FormLabel color="gray.600" fontWeight="semibold">Phone</FormLabel>
                <Input
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  bg="white"
                  color="gray.800"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                  borderRadius="md"
                  padding={4}
                />
              </FormControl>

              <FormControl id="email">
                <FormLabel color="gray.600" fontWeight="semibold">Email</FormLabel>
                <Input
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  bg="white"
                  color="gray.800"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                  borderRadius="md"
                  padding={4}
                />
              </FormControl>

              <Button
                colorScheme="red"
                type="submit"
                size="lg"
                width={{ base: "full", sm: "auto" }}
                maxWidth="150px"
                marginLeft="auto"
                borderRadius={10}
                leftIcon={<AddIcon />}
                _hover={{ bg: "red.600", boxShadow: "md" }}
                _active={{ bg: "red.700", transform: "scale(0.98)" }}
                _focus={{ boxShadow: "outline" }}
              >
                Add Donor
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default AddDonor;

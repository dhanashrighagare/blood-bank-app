"use client";

import { useState, useEffect } from 'react';
import { Box, Button, Input, FormControl, FormLabel, useToast, Flex, Heading, VStack } from '@chakra-ui/react';
import AdminSidebar from '@/app/components/adminsidebar';
import API from '@/app/utils/axiosInstance';
import { EditIcon, BellIcon } from '@chakra-ui/icons';
import { useRouter, useParams } from 'next/navigation';

const EditDonorPage = () => {
  const [donor, setDonor] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const toast = useToast();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchDonor = async () => {
        try {
          const response = await API.get(`/donors/get-donor/${id}`);
          if (response.data.success) {
            setDonor(response.data.donor);
          } else {
            setError(response.data.message || 'Failed to fetch donor');
          }
        } catch (error) {
          setError(error.message || 'Error fetching donor');
        }
      };

      fetchDonor();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonor({ ...donor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put(`/donors/update-donor/${id}`, donor);
      if (response.data.success) {
        toast({
          title: 'Success',
          description: response.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/donorlist');
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
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while updating the donor.',
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
            <Heading mb={4} ml={7} textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">
            Update Donor
            </Heading>
            <Flex align="center">
              {/* Notification Icon */}
              <BellIcon boxSize={8} mr={6} color="gray.600" />
              {/* Logout Button */}
              <Button colorScheme="red">
                Logout
              </Button>
            </Flex>
          </Flex>
        </Box>

        <Box mt={2} ml={4} p={6} height="89%" bg="gray.100" shadow="lg" borderRadius="md">
          {error ? (
            <Box p={4} color="red.500">
              {error}
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <VStack spacing={6} align="stretch">
                <FormControl id="name" isRequired>
                  <FormLabel color="gray.600" fontWeight="semibold">Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={donor.name}
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
                    type="text"
                    name="address"
                    value={donor.address}
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
                    type="text"
                    name="phone"
                    value={donor.phone}
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

                <FormControl id="email" isRequired>
                  <FormLabel color="gray.600" fontWeight="semibold">Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={donor.email}
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

                <Button
                  colorScheme="red"
                  type="submit"
                  size="lg"
                  width={{ base: "full", sm: "auto" }}
                  maxWidth="200px"
                  marginLeft={950}
                  borderRadius={10}
                  leftIcon={<EditIcon />}
                  _hover={{ bg: "red.600", boxShadow: "md" }}
                  _active={{ bg: "red.700", transform: "scale(0.98)" }}
                  _focus={{ boxShadow: "outline" }}
                >
                  Save Changes
                </Button>
              </VStack>
            </form>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default EditDonorPage;

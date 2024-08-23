"use client";

import { useState, useEffect } from 'react';
import { Box, Button, Input, FormControl, FormLabel, useToast, Flex, Heading, VStack, Select } from '@chakra-ui/react';
import AdminSidebar from '@/app/components/adminsidebar';
import API from '@/app/utils/axiosInstance';
import { EditIcon } from '@chakra-ui/icons';
import { useRouter, useParams } from 'next/navigation';

const EditBloodInventoryPage = () => {
  const [inventoryItem, setInventoryItem] = useState({
    bloodType: '',
    quantity: '',
    expiryDate: ''
  });
  const [error, setError] = useState(null);
  const toast = useToast();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchInventoryItem = async () => {
        try {
          const response = await API.get(`/blood/${id}`);
          if (response.data.success) {
            setInventoryItem(response.data.bloodRecord);
          } else {
            setError(response.data.message || 'Failed to fetch blood inventory item');
          }
        } catch (error) {
          setError(error.message || 'Error fetching blood inventory item');
        }
      };

      fetchInventoryItem();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventoryItem({ ...inventoryItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put(`/blood/${id}`, inventoryItem);
      if (response.data.success) {
        toast({
          title: 'Success',
          description: response.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/bloodinventorylist');
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
        description: 'An error occurred while updating the blood inventory.',
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
              Update Blood Inventory
            </Heading>
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
                <FormControl id="bloodType" isRequired>
                  <FormLabel color="gray.600" fontWeight="semibold">Blood Type</FormLabel>
                  <Select
                    name="bloodType"
                    value={inventoryItem.bloodType}
                    onChange={handleChange}
                    bg="white"
                    color="gray.800"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                    borderRadius="md"
                    padding={4}
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </Select>
                </FormControl>

                <FormControl id="quantity" isRequired>
                  <FormLabel color="gray.600" fontWeight="semibold">Quantity</FormLabel>
                  <Input
                    type="number"
                    name="quantity"
                    value={inventoryItem.quantity}
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

                <FormControl id="expiryDate" isRequired>
                  <FormLabel color="gray.600" fontWeight="semibold">Expiry Date</FormLabel>
                  <Input
                    type="date"
                    name="expiryDate"
                    value={inventoryItem.expiryDate}
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

export default EditBloodInventoryPage;

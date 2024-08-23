"use client";

import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, VStack, useToast, Flex, Heading } from '@chakra-ui/react';
import API from '../utils/axiosInstance'; 
import AdminSidebar from '@/app/components/adminsidebar';
import { AddIcon, BellIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

const AddBloodInventory = () => {
  const [bloodType, setBloodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/blood/add', {
        bloodType,
        quantity,
        expiryDate,
      });
      toast({
        title: 'Success',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/bloodinventorylist');
      setBloodType('');
      setQuantity('');
      setExpiryDate('');
    } catch (error) {
      console.error('Error:', error); 
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'An error occurred while adding blood to inventory.',
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
        <Box p={3} bg="white" shadow="md" borderRadius="md">
          <Flex align="center" justify="space-between">
            <Heading mb={4} ml={7} textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">Blood Inventory</Heading>
            <Flex align="center">
              <BellIcon boxSize={8} mr={6} color="gray.600" />
              <Button colorScheme="red">Logout</Button>
            </Flex>
          </Flex>
        </Box>

        <Box mt={2} ml={4} p={6} height="89%" bg="gray.100" shadow="lg" borderRadius="md">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Blood Type</FormLabel>
                <Select
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  placeholder="Select blood type"
                  bg="white"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Quantity</FormLabel>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  bg="white"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Expiry Date</FormLabel>
                <Input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="Enter expiry date"
                  bg="white"
                />
              </FormControl>

              <Button
                colorScheme="red"
                type="submit"
                size="lg"
                width={{ base: 'full', sm: 'auto' }}
                maxWidth="200px"
                marginLeft={950}
                borderRadius={10}
                leftIcon={<AddIcon />}
                _hover={{ bg: 'red.600', boxShadow: 'md' }}
                _active={{ bg: 'red.700', transform: 'scale(0.98)' }}
                _focus={{ boxShadow: 'outline' }}
              >
                Add Blood
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default AddBloodInventory;

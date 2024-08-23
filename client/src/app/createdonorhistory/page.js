"use client";

import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast, VStack, Flex, Heading } from '@chakra-ui/react';
import API from '../utils/axiosInstance';
import { BellIcon, AddIcon } from '@chakra-ui/icons';
import AdminSidebar from '@/app/components/adminsidebar';
import { useRouter } from 'next/navigation'; 

const CreateDonorHistory = () => {
  const [donor, setDonor] = useState('');
  const [donationDate, setDonationDate] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const toast = useToast();
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/donors/history', {
        donor,
        donationDate,
        amount,
        notes,
      });

      toast({
        title: 'Success',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Clear form fields
      setDonor('');
      setDonationDate('');
      setAmount('');
      setNotes('');
      
      // Navigate to another page
      router.push('/donorhistorylist');
    } catch (error) {
      console.error('Error during submission:', error); 
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'An error occurred while creating donor history.',
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
            <Heading mb={4} ml={7} textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">Create Donor History</Heading>
            <Flex align="center">
              <BellIcon boxSize={8} mr={6} color="gray.600" />
              <Button colorScheme="red">Logout</Button>
            </Flex>
          </Flex>
        </Box>

        <Box mt={2} ml={4} p={6} height="89%" bg="gray.100" shadow="lg" borderRadius="md">
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Donor ID</FormLabel>
              <Input
                type="text"
                value={donor}
                onChange={(e) => setDonor(e.target.value)}
                placeholder="Enter donor ID"
                bg="white"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Donation Date</FormLabel>
              <Input
                type="date"
                value={donationDate}
                onChange={(e) => setDonationDate(e.target.value)}
                placeholder="Enter donation date"
                bg="white"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                bg="white"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter any notes"
                bg="white"
              />
            </FormControl>

            <Button
              colorScheme="red"
              type="submit"
              size="lg"
              width={{ base: "full", sm: "auto" }}
              maxWidth="250px"
              marginLeft={900}
              borderRadius={10}
              leftIcon={<AddIcon />}
              _hover={{ bg: "red.600", boxShadow: "md" }}
              _active={{ bg: "red.700", transform: "scale(0.98)" }}
              _focus={{ boxShadow: "outline" }}
              onClick={handleSubmit}
            >
              Add Donor History
            </Button>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default CreateDonorHistory;

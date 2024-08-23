"use client";

import { useState } from 'react';
import { Box, Button, Flex, Heading, VStack, Text, Input, useToast, FormControl, FormLabel } from '@chakra-ui/react';
import AdminSidebar from '@/app/components/adminsidebar';
import API from '../utils/axiosInstance';
import { AddIcon, BellIcon } from '@chakra-ui/icons';

const GetDonorHistoryID = () => {
  const [donorId, setDonorId] = useState('');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const toast = useToast();

  const fetchDonorHistory = async () => {
    if (!donorId) {
      toast({
        title: 'Error',
        description: 'Donor ID is required',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setError('');
    try {
      const response = await API.get(`/donors/history/${donorId}`);
      setHistory(response.data.history);
      toast({
        title: 'Success',
        description: 'Donor history fetched successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'An error occurred while fetching donor history.',
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
              Get Donor History
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
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Donor ID</FormLabel>
              <Input
                type="text"
                value={donorId}
                onChange={(e) => setDonorId(e.target.value)}
                placeholder="Enter donor ID"
                bg="white"
              />
            </FormControl>

            <Button
              colorScheme="red"
              type="button"
              size="lg"
              width={{ base: "full", sm: "auto" }}
              maxWidth="250px"
              marginLeft={900}
              borderRadius={10}
              leftIcon={<AddIcon />}
              onClick={fetchDonorHistory}
              _hover={{ bg: "red.600", boxShadow: "md" }}
              _active={{ bg: "red.700", transform: "scale(0.98)" }}
              _focus={{ boxShadow: "outline" }}
            >
              Get Donor History
            </Button>

            {error && (
              <Text color="red.500">{error}</Text>
            )}

            {history.length > 0 && (
              <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                {history.map((entry) => (
                  <Box key={entry._id} mb={4}>
                    <Text><strong>Donation Date:</strong> {new Date(entry.donationDate).toLocaleDateString()}</Text>
                    <Text><strong>Amount:</strong> ${entry.amount}</Text>
                    <Text><strong>Notes:</strong> {entry.notes}</Text>
                  </Box>
                ))}
              </Box>
            )}
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default GetDonorHistoryID;

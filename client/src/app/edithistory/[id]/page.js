"use client";

import { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast, Flex, Heading, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import AdminSidebar from '@/app/components/adminsidebar';
import { BellIcon } from '@chakra-ui/icons';

const EditDonorHistoryPage = () => {
  const [history, setHistory] = useState(null);
  const [donationDate, setDonationDate] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);
  const toast = useToast();
  const router = useRouter();
  const { historyId } = useParams();

  useEffect(() => {
    if (historyId) {
      const fetchHistory = async () => {
        try {
          const response = await axios.get(`/donors/history/${historyId}`);
          if (response.data.success) {
            setHistory(response.data.history);
            setDonationDate(response.data.history.donationDate || '');
            setAmount(response.data.history.amount || '');
            setNotes(response.data.history.notes || '');
          } else {
            setError(response.data.message || 'Failed to fetch history');
          }
        } catch (error) {
          setError(error.message || 'Error fetching history');
        }
      };

      fetchHistory();
    }
  }, [historyId]);

  const handleChangeDate = (e) => {
    setDonationDate(e.target.value);
  };

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleChangeNotes = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/donors/history/${historyId}`, { donationDate, amount, notes });
      if (response.data.success) {
        toast({
          title: 'Success',
          description: 'Donor history updated successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/donor-history-list');
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
        description: 'An error occurred while updating donor history.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!history && !error) {
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
        {/* Navbar */}
        <Box p={3} bg="white" shadow="md" borderRadius="md">
          <Flex align="center" justify="space-between">
            <Heading mb={4} ml={7} textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">
              Edit Donor History
            </Heading>
            <Flex align="center">
              <BellIcon boxSize={8} mr={6} color="gray.600" />
              {/* Logout Button */}
              <Button colorScheme="red">Logout</Button>
            </Flex>
          </Flex>
        </Box>

        {/* Main Content */}
        <Box mt={2} p={6} bg="gray.100" shadow="lg" borderRadius="md">
          {error ? (
            <Box p={4} color="red.500">
              {error}
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <VStack spacing={6} align="stretch">
                <FormControl id="donationDate" isRequired>
                  <FormLabel color="gray.600" fontWeight="semibold">Donation Date</FormLabel>
                  <Input
                    type="date"
                    value={donationDate}
                    onChange={handleChangeDate}
                    bg="white"
                    color="gray.800"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                    borderRadius="md"
                    padding={4}
                  />
                </FormControl>
                <FormControl id="amount" isRequired>
                  <FormLabel color="gray.600" fontWeight="semibold">Amount</FormLabel>
                  <Input
                    type="number"
                    value={amount}
                    onChange={handleChangeAmount}
                    bg="white"
                    color="gray.800"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                    borderRadius="md"
                    padding={4}
                  />
                </FormControl>
                <FormControl id="notes" isRequired>
                  <FormLabel color="gray.600" fontWeight="semibold">Notes</FormLabel>
                  <Textarea
                    value={notes}
                    onChange={handleChangeNotes}
                    bg="white"
                    color="gray.800"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                    borderRadius="md"
                    padding={4}
                    minHeight="120px"
                  />
                </FormControl>
                <Button
                  colorScheme="blue"
                  type="submit"
                  size="lg"
                  width={{ base: "full", sm: "auto" }}
                  maxWidth="200px"
                  borderRadius={10}
                  _hover={{ bg: "blue.600", boxShadow: "md" }}
                  _active={{ bg: "blue.700", transform: "scale(0.98)" }}
                  _focus={{ boxShadow: "outline" }}
                >
                  Update History
                </Button>
              </VStack>
            </form>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default EditDonorHistoryPage;

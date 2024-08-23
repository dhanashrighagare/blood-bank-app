"use client";

import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast, VStack, Flex, Heading } from '@chakra-ui/react';
import API from '../utils/axiosInstance';
import AdminSidebar from '@/app/components/adminsidebar';
import { AddIcon, BellIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

const CreateAppointment = () => {
  const [user, setUser] = useState(''); 
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/appointments/create-appointment', {
        user, 
        date,
        time,
        notes,
      });

      toast({
        title: 'Success',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setUser('');
      setDate('');
      setTime('');
      setNotes('');
      router.push('/appointmentlist');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'An error occurred while creating the appointment.',
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
            <Heading mb={4} ml={7} textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">
              Create Appointment
            </Heading>
            <Flex align="center">
              <BellIcon boxSize={8} mr={6} color="gray.600" />
              <Button colorScheme="red">
                Logout
              </Button>
            </Flex>
          </Flex>
        </Box>

        <Box mt={2} ml={4} p={6} height="89%" bg="gray.100" shadow="lg" borderRadius="md">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>User ID</FormLabel>
                <Input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Enter user ID"
                  bg="white"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Select date"
                  bg="white"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Time</FormLabel>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Select time"
                  bg="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Notes</FormLabel>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter any additional notes"
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
              >
                Create Appointment
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default CreateAppointment;

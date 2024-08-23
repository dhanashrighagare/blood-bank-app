"use client";

import { useState, useEffect } from 'react';
import { Box, Button, Input, FormControl, FormLabel, useToast, Flex, Heading, VStack, Textarea } from '@chakra-ui/react';
import AdminSidebar from '@/app/components/adminsidebar';
import API from '@/app/utils/axiosInstance';
import { EditIcon } from '@chakra-ui/icons';
import { useRouter, useParams } from 'next/navigation';

const EditAppointmentPage = () => {
  const [appointment, setAppointment] = useState({
    user: '',
    date: '',
    time: '',
    notes: '',
  });
  const [error, setError] = useState(null);
  const toast = useToast();
  const router = useRouter();
  const { id } = useParams(); 

  useEffect(() => {
    if (id) {
      const fetchAppointment = async () => {
        try {
          const response = await API.get(`/api/v1/appointments/${id}`);
          if (response.data.success) {
            setAppointment(response.data.appointment); 
          } else {
            setError(response.data.message || 'Failed to fetch appointment');
          }
        } catch (error) {
          setError(error.message || 'Error fetching appointment');
        }
      };

      fetchAppointment();
    }
  }, [id]);

  // Define handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put(`/api/v1/appointments/${id}`, appointment);
      if (response.data.success) {
        toast({
          title: 'Success',
          description: response.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/appointmentslist'); 
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
        description: 'An error occurred while updating the appointment.',
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
              Edit Appointment
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
                <FormControl id="user" isRequired>
                  <FormLabel color="gray.600" fontWeight="semibold">User ID</FormLabel>
                  <Input
                    type="text"
                    name="user"
                    value={appointment.user}
                    onChange={handleChange} // Use handleChange
                    bg="white"
                    color="gray.800"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                    borderRadius="md"
                    padding={4}
                    readOnly 
                  />
                </FormControl>

                <FormControl id="date" isRequired>
                  <FormLabel color="gray.600" fontWeight="semibold">Date</FormLabel>
                  <Input
                    type="date"
                    name="date"
                    value={appointment.date}
                    onChange={handleChange} // Use handleChange
                    bg="white"
                    color="gray.800"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                    borderRadius="md"
                    padding={4}
                  />
                </FormControl>

                <FormControl id="time" isRequired>
                  <FormLabel color="gray.600" fontWeight="semibold">Time</FormLabel>
                  <Input
                    type="time"
                    name="time"
                    value={appointment.time}
                    onChange={handleChange} // Use handleChange
                    bg="white"
                    color="gray.800"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                    borderRadius="md"
                    padding={4}
                  />
                </FormControl>

                <FormControl id="notes">
                  <FormLabel color="gray.600" fontWeight="semibold">Notes</FormLabel>
                  <Textarea
                    name="notes"
                    value={appointment.notes}
                    onChange={handleChange} // Use handleChange
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

export default EditAppointmentPage;

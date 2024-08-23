"use client";

import {  useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea, FormControl, FormLabel, useToast, Flex, Heading, VStack, Select,useDisclosure } from '@chakra-ui/react';
import { EditIcon, BellIcon } from '@chakra-ui/icons';
import API from '@/app/utils/axiosInstance';
import AdminSidebar from '@/app/components/adminsidebar';
import NotificationPopup from '@/app/notificationpopup/page';
import Logout from '@/app/logout/page';

const EditBloodRequestPage = () => {
  const [request, setRequest] = useState({
    requesterName: '',
    bloodGroup: '',
    quantity: '',
    notes: ''
  });
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const toast = useToast();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchRequest = async () => {
        try {
          const response = await API.get(`/blood-requests/requests/${id}`);
          if (response.data.success) {
            const { bloodRequest } = response.data;
            setRequest({
              requesterName: bloodRequest.requester ? bloodRequest.requester.name : '',
              bloodGroup: bloodRequest.bloodGroup,
              quantity: bloodRequest.quantity,
              notes: bloodRequest.notes || ''
            });
          } else {
            setError(response.data.message || 'Failed to fetch request');
          }
        } catch (error) {
          setError(error.message || 'Error fetching request');
        }
      };

      fetchRequest();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put(`/blood-requests/update-blood-request/${id}`, request);
      if (response.data.success) {
        toast({
          title: 'Success',
          description: response.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/bloodrequestlist');
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
        description: 'An error occurred while updating the blood request.',
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
              Update Blood Request
            </Heading>
            <Flex align="center">
              {/* Notification Popup */}
              <NotificationPopup isOpen={isOpen} onClose={onClose} />
              <Box mx={3} />
              {/* Logout Button */}
              <Logout />
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
                <FormControl id="requesterName" isRequired>
                  <FormLabel color="gray.600" fontWeight="semibold">Requester Name</FormLabel>
                  <Input
                    type="text"
                    name="requesterName"
                    value={request.requesterName}
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

                <FormControl id="bloodGroup" isRequired>
                  <FormLabel color="gray.600" fontWeight="semibold">Blood Group</FormLabel>
                  <Select
                    name="bloodGroup"
                    value={request.bloodGroup}
                    onChange={handleChange}
                    bg="white"
                    ml={-4}
                    w={1170}
                    color="gray.800"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.500" }}
                    _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
                    borderRadius="md"
                    padding={4}
                    fontSize="md"
                  >
                    <option value="">Select Blood Group</option>
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

                <FormControl id="quantity" isRequired>
                  <FormLabel color="gray.600" fontWeight="semibold">Quantity</FormLabel>
                  <Input
                    type="number"
                    name="quantity"
                    value={request.quantity}
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

                <FormControl id="notes">
                  <FormLabel color="gray.600" fontWeight="semibold">Notes</FormLabel>
                  <Textarea
                    name="notes"
                    value={request.notes}
                    onChange={handleChange}
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

export default EditBloodRequestPage;

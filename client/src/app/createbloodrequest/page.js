"use client";

import { useState } from 'react';
import { Box, Button, Input, Textarea, FormControl, FormLabel, useToast, Flex, Heading, VStack, Select } from '@chakra-ui/react';
import AdminSidebar from '@/app/components/adminsidebar';
import API from '../utils/axiosInstance';
import { AddIcon, BellIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation'; 

const CreateBloodRequest = () => {
    const [requesterName, setRequesterName] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [quantity, setQuantity] = useState('');
    const [notes, setNotes] = useState('');
    const toast = useToast();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post('/blood-requests/create-blood-request', {
                requesterName,
                bloodGroup,
                quantity,
                notes,
            });

            if (response.data.success) {
                toast({
                    title: 'Success',
                    description: response.data.message,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setRequesterName('');
                setBloodGroup('');
                setQuantity('');
                setNotes('');
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
            console.error('Error:', error);
            toast({
                title: 'Error',
                description: 'An error occurred while creating the blood request.',
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
                            Create Blood Request
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
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={6} align="stretch">
                            <FormControl id="requesterName" isRequired>
                                <FormLabel color="gray.600" fontWeight="semibold">Requester Name</FormLabel>
                                <Input
                                    type="text"
                                    value={requesterName}
                                    onChange={(e) => setRequesterName(e.target.value)}
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
                                    value={bloodGroup}
                                    onChange={(e) => setBloodGroup(e.target.value)}
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
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
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
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
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
                                maxWidth="150px"
                                marginLeft={1000}
                                borderRadius={10}
                                leftIcon={<AddIcon />}
                                _hover={{ bg: "red.600", boxShadow: "md" }}
                                _active={{ bg: "red.700", transform: "scale(0.98)" }}
                                _focus={{ boxShadow: "outline" }}
                            >
                                Create 
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
};

export default CreateBloodRequest;

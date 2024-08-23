"use client";

import { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, useToast, Flex, Heading, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button as ChakraButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import API from '../utils/axiosInstance'; 
import AdminSidebar from '@/app/components/adminsidebar';
import NextLink from 'next/link';
import NotificationPopup from '@/app/notificationpopup/page';
import Logout from '@/app/logout/page';

const BloodRequestList = () => {
    const [bloodRequests, setBloodRequests] = useState([]);
    const [deletingRequestId, setDeletingRequestId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

    useEffect(() => {
        const fetchBloodRequests = async () => {
            try {
                const response = await API.get('/blood-requests/get-blood-requests');
                setBloodRequests(response.data.bloodRequests);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error.message);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch blood requests.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchBloodRequests();
    }, [toast]);

    const handleDelete = async () => {
        try {
            await API.delete(`/blood-requests/delete-blood-request/${deletingRequestId}`);
            setBloodRequests(bloodRequests.filter(request => request._id !== deletingRequestId));
            toast({
                title: 'Success',
                description: 'Blood request deleted successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            onConfirmClose();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete blood request.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const openConfirmDialog = (id) => {
        setDeletingRequestId(id);
        onConfirmOpen();
    };

    if (loading) return <Box>Loading...</Box>;
    if (error) return <Box>Error: {error}</Box>;

    return (
        <Flex>
            <AdminSidebar />
            <Box ml="16%" width="84%" p={6}>
                <Box p={3} bg="white" shadow="md" borderRadius="md">
                    <Flex align="center" justify="space-between">
                        <Heading mb={4} ml={7} textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">
                            Blood Requests
                        </Heading>
                        <Flex align="center">
                            <NotificationPopup isOpen={isOpen} onClose={onClose} />
                            <Box mx={3} />
                            <Logout />
                        </Flex>
                    </Flex>
                </Box>

                <Box mt={6} ml={3}>
                    <Table variant="simple">
                        <TableCaption>List of all blood requests</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Blood Group</Th>
                                <Th>Quantity</Th>
                                <Th>Notes</Th>
                                <Th>Created At</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {bloodRequests.map(request => (
                                <Tr key={request._id}>
                                    <Td>{request.bloodGroup}</Td>
                                    <Td>{request.quantity}</Td>
                                    <Td>{request.notes || 'N/A'}</Td>
                                    <Td>{new Date(request.createdAt).toLocaleDateString()}</Td>
                                    <Td>
                                        <Flex gap={2}>
                                            <NextLink href={`editbloodrequest/${request._id}`} passHref>
                                                <IconButton
                                                    aria-label="Edit"
                                                    icon={<EditIcon />}
                                                    colorScheme="blue"
                                                    size="sm"
                                                />
                                            </NextLink>
                                            <IconButton
                                                aria-label="Delete"
                                                icon={<DeleteIcon />}
                                                colorScheme="red"
                                                size="sm"
                                                onClick={() => openConfirmDialog(request._id)}
                                            />
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>

            <Modal isOpen={isConfirmOpen} onClose={onConfirmClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Deletion</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this blood request?
                    </ModalBody>
                    <ModalFooter>
                        <ChakraButton colorScheme="blue" mr={3} onClick={onConfirmClose}>
                            Cancel
                        </ChakraButton>
                        <ChakraButton colorScheme="red" onClick={handleDelete}>
                            Delete
                        </ChakraButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default BloodRequestList;

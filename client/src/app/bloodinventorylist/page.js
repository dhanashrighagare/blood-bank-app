"use client";

import { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, useToast, Flex, Heading, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button as ChakraButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import API from '../utils/axiosInstance'; 
import AdminSidebar from '@/app/components/adminsidebar';
import NextLink from 'next/link';
import NotificationPopup from '@/app/notificationpopup/page';
import Logout from '@/app/logout/page';

const BloodInventoryList = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [deletingItemId, setDeletingItemId] = useState(null);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

    useEffect(() => {
        const fetchInventoryItems = async () => {
            try {
                const response = await API.get('/blood'); 
                setInventoryItems(response.data.bloodRecords); 
            } catch (error) {
                setError(error.message);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch blood inventory.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchInventoryItems();
    }, [toast]);

    const handleDelete = async () => {
        try {
            await API.delete(`/blood/${deletingItemId}`); 
            setInventoryItems(inventoryItems.filter(item => item._id !== deletingItemId));
            toast({
                title: 'Success',
                description: 'Blood inventory item deleted successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            onConfirmClose();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete blood inventory item.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const openConfirmDialog = (id) => {
        setDeletingItemId(id);
        onConfirmOpen();
    };

    return (
        <Flex>
            <AdminSidebar />
            <Box ml="16%" width="84%" p={6}>
                <Box p={3} bg="white" shadow="md" borderRadius="md">
                    <Flex align="center" justify="space-between">
                        <Heading mb={4} ml={7} textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">
                            Blood Inventory
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
                        <TableCaption>List of all blood inventory items</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Blood Type</Th>
                                <Th>Quantity</Th>
                                <Th>Expiry Date</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {inventoryItems.length > 0 ? (
                                inventoryItems.map(item => (
                                    <Tr key={item._id}>
                                        <Td>{item.bloodType}</Td>
                                        <Td>{item.quantity}</Td>
                                        <Td>{new Date(item.expiryDate).toLocaleDateString()}</Td>
                                        <Td>
                                            <Flex gap={2}>
                                                <NextLink href={`editbloodinventory/${item._id}`} passHref>
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
                                                    onClick={() => openConfirmDialog(item._id)}
                                                />
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan="4" textAlign="center">
                                        No records found
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </Box>
            </Box>

            <Modal isOpen={isConfirmOpen} onClose={onConfirmClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Deletion</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this blood inventory item?
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

export default BloodInventoryList;

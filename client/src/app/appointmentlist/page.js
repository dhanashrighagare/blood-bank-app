"use client";

import { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, useToast, Flex, Heading, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button as ChakraButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import API from '../utils/axiosInstance'; 
import AdminSidebar from '@/app/components/adminsidebar';
import NextLink from 'next/link';
import NotificationPopup from '@/app/notificationpopup/page';
import Logout from '@/app/logout/page';

const AppointmentsList = () => {
    const [appointments, setAppointments] = useState([]);
    const [deletingAppointmentId, setDeletingAppointmentId] = useState(null);
    const toast = useToast();
    const { isOpen,  onClose } = useDisclosure();
    const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await API.get('/appointments/all');
                setAppointments(response.data.appointments);
            } catch (error) {
                setError(error.message);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch appointments.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchAppointments();
    }, [toast]);

    const handleDelete = async () => {
        try {
            if (deletingAppointmentId) {
                await API.delete(`/appointments/${deletingAppointmentId}`);
                setAppointments(appointments.filter(appointment => appointment._id !== deletingAppointmentId));
                toast({
                    title: 'Success',
                    description: 'Appointment deleted successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                onConfirmClose();
            } else {
                throw new Error("Appointment ID is missing");
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: `Failed to delete appointment: ${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const openConfirmDialog = (id) => {
        setDeletingAppointmentId(id);
        onConfirmOpen();
    };

    return (
        <Flex>
            <AdminSidebar />
            <Box ml="16%" width="84%" p={6}>
                <Box p={3} bg="white" shadow="md" borderRadius="md">
                    <Flex align="center" justify="space-between">
                        <Heading mb={4} ml={7} textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">
                            Appointments List
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
                        <TableCaption>List of all appointments</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>User ID</Th>
                                <Th>Date</Th>
                                <Th>Time</Th>
                                <Th>Notes</Th>
                                <Th>Status</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {appointments.length > 0 ? (
                                appointments.map(appointment => (
                                    <Tr key={appointment._id}>
                                        <Td>{appointment.user}</Td>
                                        <Td>{new Date(appointment.date).toLocaleDateString()}</Td>
                                        <Td>{appointment.time}</Td>
                                        <Td>{appointment.notes || 'N/A'}</Td>
                                        <Td>{appointment.status || 'N/A'}</Td>
                                        <Td>
                                            <Flex gap={2}>
                                                <NextLink href={`editappointment/${appointment._id}}`} passHref>
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
                                                    onClick={() => openConfirmDialog(appointment._id)}
                                                />
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan="6" textAlign="center">
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
                        Are you sure you want to delete this appointment?
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

export default AppointmentsList;

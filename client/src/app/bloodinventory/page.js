"use client";

import { Box, Flex, Heading, Button, useDisclosure } from '@chakra-ui/react';
import { AddIcon, ViewIcon, EditIcon, BellIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import AdminSidebar from '@/app/components/adminsidebar';
import NotificationPopup from '@/app/notificationpopup/page';
import Logout from '@/app/logout/page';

const BloodInventory = () => {
  const exampleInventoryId = 1; 
  const { isOpen,  onClose } = useDisclosure();  

  return (
    <Flex>
      <AdminSidebar />
      <Box ml="16%" width="84%" p={6}>
        {/* Navbar */}
        <Box p={3} bg="white" shadow="md" borderRadius="md">
          <Flex align="center" justify="space-between">
            <Heading mb={4} ml={7} textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">
              Blood Inventory
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
          <Flex direction="row" wrap="wrap" gap={4}>
            <NextLink href="/addbloodinventory" passHref>
              <Button
                bg="purple.300"
                color="black" 
                size="lg"
                width="250px"
                height="150px"
                borderRadius={20}
                leftIcon={<AddIcon />}
                _hover={{ bg: "purple.500" }} 
                _active={{ bg: "purple.800" }}
              >
                Add Blood Inventory
              </Button>
            </NextLink>
            <NextLink href="/bloodinventorylist" passHref>
              <Button
                bg="cyan.300"
                color="black" 
                size="lg"
                width="250px"
                height="150px"
                borderRadius={20}
                leftIcon={<ViewIcon />}
                _hover={{ bg: "cyan.500" }} 
                _active={{ bg: "cyan.800" }} 
              >
                View Blood Inventory
              </Button>
            </NextLink>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default BloodInventory;

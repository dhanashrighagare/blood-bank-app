"use client";

import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import AdminSidebar from '@/app/components/adminsidebar';

const Notifications = () => {
  return (
    <Flex>
      <AdminSidebar />
      <Box ml="16%" width="84%" p={6}>
        {/* Navbar */}
        <Box p={4} bg="white" shadow="md" borderRadius="md">
          <Flex align="center" justify="space-between">
            <Heading mb={4}>Notifications</Heading>
            <NextLink href="/logout" passHref>
              <Button colorScheme="red">
                Logout
              </Button>
            </NextLink>
          </Flex>
        </Box>

        <Box mt={20} ml={80}> 
          <Flex direction="row" wrap="wrap" gap={4}> 
            <NextLink href="/admin/notifications/send" passHref>
              <Button colorScheme="teal" size="lg" width="250px" height="150px">
                Send Notification
              </Button>
            </NextLink>
            <NextLink href="/admin/notifications" passHref>
              <Button colorScheme="blue" size="lg" width="250px" height="150px">
                Get Notifications
              </Button>
            </NextLink>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Notifications;

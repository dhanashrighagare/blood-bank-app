import { Box, Flex, Heading, Stack, Link, Image } from '@chakra-ui/react';
import { MenuAlt1Icon, SwitchVerticalIcon, ClipboardListIcon, CalendarIcon, UsersIcon, ClockIcon } from '@heroicons/react/outline';

const AdminSidebar = () => {

  // Update the active link based on the current path
  const isActive = (path) => location.pathname === path;


  return (
    <Flex direction="row" height="100vh">
      <Box 
        as="aside" 
        bg="red.500" 
        color="white" 
        p={6} 
        width="18%" 
        borderRight="1px" 
        borderColor="gray.300" 
        boxShadow="md"
        position="fixed"
        height="100%"
        borderTopRightRadius="xl"
        borderBottomRightRadius="xl"
      >
        <Flex direction="column" align="center" mb={6}>
          <Flex align="center" mb={12}> 
            <Image
              src="/images/blood-donate.png"
              alt="Blood Donate"
              boxSize="50px"
              borderRadius="full"
              mr={4}
            />
            <Heading size="md">Blood Bank</Heading>
          </Flex>
          <Stack spacing={8}>
            <Link
              href="/donorlist"
              display="flex"
              alignItems="center"
              fontWeight="bold"
              color={isActive('/donorlist') ? 'white' : 'white'}
              fontSize="lg"
              bg={isActive('/donorlist') ? 'gray.600' : 'transparent'}
              p={2}
              borderRadius="md"
              _hover={{ textDecoration: 'none', bg: 'gray.700' }}
            >
              <MenuAlt1Icon style={{ width: '24px', height: '24px', marginRight: '15px' }} />
              Donor List
            </Link>
            <Link
              href="/bloodrequests"
              display="flex"
              alignItems="center"
              fontWeight="bold"
              color={isActive('/bloodrequests') ? 'white' : 'white'}
              fontSize="lg"
              bg={isActive('/bloodrequests') ? 'gray.600' : 'transparent'}
              p={2}
              borderRadius="md"
              _hover={{ textDecoration: 'none', bg: 'gray.700' }}
            >
              <SwitchVerticalIcon style={{ width: '24px', height: '24px', marginRight: '15px' }} />
              Blood Requests
            </Link>
            <Link
              href="/bloodinventory"
              display="flex"
              alignItems="center"
              fontWeight="bold"
              color={isActive('/bloodinventory') ? 'white' : 'white'}
              fontSize="lg"
              bg={isActive('/bloodinventory') ? 'gray.600' : 'transparent'}
              p={2}
              borderRadius="md"
              _hover={{ textDecoration: 'none', bg: 'gray.700' }}
            >
              <ClipboardListIcon style={{ width: '24px', height: '24px', marginRight: '15px' }} />
              Blood Inventory
            </Link>
            <Link
              href="/appointments"
              display="flex"
              alignItems="center"
              fontWeight="bold"
              color={isActive('/appointments') ? 'white' : 'white'}
              fontSize="lg"
              bg={isActive('/appointments') ? 'gray.600' : 'transparent'}
              p={2}
              borderRadius="md"
              _hover={{ textDecoration: 'none', bg: 'gray.700' }}
              onClick={() => handleLinkClick('appointments')}
            >
              <CalendarIcon style={{ width: '24px', height: '24px', marginRight: '15px' }} />
              Appointments
            </Link>
            <Link
              href="/usermanagement"
              display="flex"
              alignItems="center"
              fontWeight="bold"
              color={isActive('/usermanagement') ? 'white' : 'white'}
              fontSize="lg"
              bg={isActive('/usermanagement') ? 'gray.600' : 'transparent'}
              p={2}
              borderRadius="md"
              _hover={{ textDecoration: 'none', bg: 'gray.700' }}
            >
              <UsersIcon style={{ width: '24px', height: '24px', marginRight: '15px' }} />
              User
            </Link>
            <Link
              href="/historymanagement"
              display="flex"
              alignItems="center"
              fontWeight="bold"
              color={isActive('/historymanagement') ? 'white' : 'white'}
              fontSize="lg"
              bg={isActive('/historymanagement') ? 'gray.600' : 'transparent'}
              p={2}
              borderRadius="md"
              _hover={{ textDecoration: 'none', bg: 'gray.700' }}
            >
              <ClockIcon style={{ width: '24px', height: '24px', marginRight: '15px' }} />
              History
            </Link>
            {/* <Link
              href="/notifications"
              display="flex"
              alignItems="center"
              fontWeight="bold"
              color={isActive('notifications') ? 'white' : 'white'}
              fontSize="lg"
              bg={isActive('notifications') ? 'gray.600' : 'transparent'}
              p={2}
              borderRadius="md"
              _hover={{ textDecoration: 'none', bg: 'gray.700' }}
              onClick={() => handleLinkClick('notifications')}
            >
              <BellIcon style={{ width: '24px', height: '24px', marginRight: '15px' }} />
              Notifications
            </Link> */}
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AdminSidebar;

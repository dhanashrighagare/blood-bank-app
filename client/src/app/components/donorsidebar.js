import { Box, Flex, Heading, Stack, Link, Image } from '@chakra-ui/react';
import { UserIcon, CalendarIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/navigation';

const DonorSidebar = () => {
  const router = useRouter();
  const { pathname } = router;

  // Update the active link based on the current path
  const isActive = (path) => pathname === path;

  return (
    <Flex direction="row" height="100vh">
      <Box 
        as="aside" 
        bg="red.500"  // Set background color to red
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
            <Heading size="md">Donor Dashboard</Heading>
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
              <UserIcon style={{ width: '24px', height: '24px', marginRight: '15px' }} />
              Donor List
            </Link>
            <Link
              href="/donorprofile"
              display="flex"
              alignItems="center"
              fontWeight="bold"
              color={isActive('/donorprofile') ? 'white' : 'white'}
              fontSize="lg"
              bg={isActive('/donorprofile') ? 'gray.600' : 'transparent'}
              p={2}
              borderRadius="md"
              _hover={{ textDecoration: 'none', bg: 'gray.700' }}
            >
              <UserIcon style={{ width: '24px', height: '24px', marginRight: '15px' }} />
              My Profile
            </Link>
            <Link
              href="/donorhistory"
              display="flex"
              alignItems="center"
              fontWeight="bold"
              color={isActive('/donorhistory') ? 'white' : 'white'}
              fontSize="lg"
              bg={isActive('/donorhistory') ? 'gray.600' : 'transparent'}
              p={2}
              borderRadius="md"
              _hover={{ textDecoration: 'none', bg: 'gray.700' }}
            >
              <DocumentTextIcon style={{ width: '24px', height: '24px', marginRight: '15px' }} />
              My History
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
            >
              <CalendarIcon style={{ width: '24px', height: '24px', marginRight: '15px' }} />
              Appointments
            </Link>
            <Link
              href="/updateappointment"
              display="flex"
              alignItems="center"
              fontWeight="bold"
              color={isActive('/updateappointment') ? 'white' : 'white'}
              fontSize="lg"
              bg={isActive('/updateappointment') ? 'gray.600' : 'transparent'}
              p={2}
              borderRadius="md"
              _hover={{ textDecoration: 'none', bg: 'gray.700' }}
            >
              <ClockIcon style={{ width: '24px', height: '24px', marginRight: '15px' }} />
              Update Appointment
            </Link>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default DonorSidebar;

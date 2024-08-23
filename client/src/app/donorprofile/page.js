"use client";

import { Flex } from '@chakra-ui/react'; 
import DonorSidebar from '@/app/components/donorsidebar';


const DonorProfile = () => {
  return (
    <Flex>
      <DonorSidebar />
    </Flex>
  );
};

export default DonorProfile;


// "use client";

// import { useEffect, useState } from 'react';
// import { Box, Flex, Heading, Text, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription, Button } from '@chakra-ui/react';
// import API from '../utils/axiosInstance'; 

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('/auth/current-user', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}` // Adjust based on your auth mechanism
//           }
//         });
//         setUser(response.data.user);
//       } catch (err) {
//         setError('Failed to fetch user data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading) {
//     return (
//       <Flex justify="center" align="center" height="100vh">
//         <Spinner size="xl" />
//       </Flex>
//     );
//   }

//   if (error) {
//     return (
//       <Flex justify="center" align="center" height="100vh">
//         <Alert status="error">
//           <AlertIcon />
//           <AlertTitle mr={2}>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       </Flex>
//     );
//   }

//   return (
//     <Flex>
//         <DonorSidebar />
//     <Flex direction="column" p={6} maxWidth="600px" margin="auto">
//       <Heading mb={6}>User Profile</Heading>
//       <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
//         <Text fontWeight="bold">Username:</Text>
//         <Text mb={4}>{user.username}</Text>
//         <Text fontWeight="bold">Email:</Text>
//         <Text mb={4}>{user.email}</Text>
//         {/* Add other user fields as necessary */}
//         <Button colorScheme="teal" mt={4} onClick={() => alert('Edit profile')}>
//           Edit Profile
//         </Button>
//       </Box>
//     </Flex>
//     </Flex>
//   );
// };

// export default UserProfile;

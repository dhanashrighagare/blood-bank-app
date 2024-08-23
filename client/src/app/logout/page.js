"use client";

import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import API from '../utils/axiosInstance'; 

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Make the API call to logout using the custom Axios instance
      const response = await API.post('/auth/logout', {}, { withCredentials: true });

      if (response.data.success) {
        // Clear local storage or any other client-side token storage
        localStorage.removeItem('token');

        // Redirect to the login page or home page
        router.push('/login'); 
      } else {
        console.error('Logout failed:', response.data.message);
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Logout failed. An error occurred.');
    }
  };

  return (
    <Button colorScheme="red" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;

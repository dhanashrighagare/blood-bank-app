'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  useToast,
  Image,
} from '@chakra-ui/react';
import API from '../utils/axiosInstance';
import { useRouter } from 'next/navigation';

// ResetPassword Component
const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleResetPassword = async () => {
    if (password.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters long',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const payload = { token, newPassword: password };
    console.log('Sending request with:', payload); 

    try {
      setLoading(true);
      const { data } = await API.post('/auth/reset-password', payload);
      
      console.log('Response data:', data);
      
      if (data.success) {
        toast({
          title: 'Password Reset Successful',
          description: 'Your password has been reset successfully. You can now log in with your new password.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/login');
      } else {
        throw new Error(data.message || 'Password reset failed');
      }
    } catch (error) {
      console.error('Reset Password Error:', error);
      toast({
        title: 'Reset Password Failed',
        description: error.message || 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleResetPassword();
  };

  return (
    <Container
      maxW="container.x"
      minH="100vh"
      position="relative"
      overflow="hidden"
      p={0}
      bg="transparent"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        backdropFilter="blur(8px)"
        zIndex={-1}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgGradient="linear(to-t, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))"
        zIndex={-2}
      />
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        textAlign="center"
        position="relative"
        zIndex={1}
      >
        <Box
          p={8}
          bg="white"
          boxShadow="lg"
          borderRadius="md"
          maxW="md"
          w="full"
          mx="auto"
        >
          <Image
            src="/images/blood-donate.png"
            alt="Logo"
            boxSize="100px"
            borderRadius="full"
            mb={4}
            mx="auto"
          />
          <Text
            mb={6}
            bgGradient="linear(to-l, #FF6347, #FF4500)"
            bgClip="text"
            fontSize={{ base: 'xl', sm: '2xl' }}
            fontWeight="bold"
          >
            Reset Password
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl id="token" isRequired mb={4}>
              <FormLabel>Reset Token</FormLabel>
              <Input
                type="text"
                placeholder="Enter your reset token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired mb={4}>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="red"
              size="lg"
              width="full"
              isLoading={loading}
            >
              Reset Password
            </Button>
          </form>
        </Box>
      </Flex>
    </Container>
  );
};

export default ResetPassword;

"use client";

import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Flex,
  useToast,
  Image,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import API from '../utils/axiosInstance';
import Link from 'next/link';
import nookies from 'nookies';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Donor');
  const toast = useToast();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (!role || !email || !password) {
        throw new Error('Please provide all fields');
      }

      const { data } = await API.post('/auth/login', { role, email, password });

      // Debugging: Log the API response
      console.log('API Response:', data);

      if (data.success) {
        // Display success toast
        toast({
          title: data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        // Store token in cookies
        nookies.set(null, 'token', data.token, {
          path: '/',
          maxAge: 30 * 24 * 60 * 60, // 30 days
          secure: process.env.NODE_ENV === 'production', // Only true in production
          sameSite: 'Strict', // Adjust according to your needs
        });

        // Extract role from the response
        const userRole = data.user?.role;

        // Debugging: Log the extracted role
        console.log('Extracted Role:', userRole);

        // Redirect based on the role
        switch (userRole) {
          case 'Donor':
            console.log('Redirecting to /');
            router.push('/');
            break;
          case 'Admin':
            console.log('Redirecting to /donorlist');
            router.push('/donorlist');
            break;
          case 'Hospital':
            console.log('Redirecting to /hospital-dashboard');
            router.push('/hospital-dashboard');
            break;
          case 'Organization':
            console.log('Redirecting to /organization-dashboard');
            router.push('/organization-dashboard');
            break;
          default:
            console.log('Redirecting to /');
            router.push('/');
            break;
        }
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error.message || 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error during login:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
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
        overflow="hidden"
        zIndex={1}
      >
        <Box
          bg="white"
          boxShadow="lg"
          borderRadius="md"
          maxW="lg"
          w="full"
          mx="auto"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          p={5}
        >
          <Image
            src="/images/blood-donate.png"
            alt="Blood Donate"
            boxSize="100px"
            mb={4}
            borderRadius="full"
          />
          <Text
            bgGradient='linear(to-l, #FF6347, #FF4500)'
            bgClip='text'
            fontSize='3xl'
            fontWeight='bold'
            mb={4}
          >
            Login
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl as="fieldset" mb={6}>
              <FormLabel as="legend">Select Role</FormLabel>
              <RadioGroup onChange={(value) => setRole(value)} value={role}>
                <Stack spacing={4} direction="row">
                  <Radio value="Donor">Donor</Radio>
                  <Radio value="Admin">Admin</Radio>
                  <Radio value="Hospital">Hospital</Radio>
                  <Radio value="Organization">Organization</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl id="email" isRequired mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button type="submit" colorScheme="red" size="lg" width="full">
              Login
            </Button>

            <Box textAlign="center" mt={4}>
              <Text fontSize="sm">
                Not registered yet?{' '}
                <Link href="/register" passHref>
                  <Button variant="link" colorScheme="blue">
                    Register Here
                  </Button>
                </Link>
              </Text>
              <Text fontSize="sm" mt={3}>
                Forgot your password?{' '}
                <Link href="/forgot-password" passHref>
                  <Button variant="link" colorScheme="blue">
                    Reset Password
                  </Button>
                </Link>
              </Text>
            </Box>
          </form>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;

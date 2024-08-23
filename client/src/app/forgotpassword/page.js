"use client";

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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const { data } = await API.post('/auth/request-password-reset', { email });

      if (data.success) {
        toast({
          title: 'Password Reset Email Sent',
          description: 'Please check your email for instructions to reset your password.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error(data.message || 'Failed to send reset email');
      }
    } catch (error) {
      toast({
        title: 'Request Failed',
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
    handleForgotPassword();
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
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="bold"
          >
            Forgot Password
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="red"
              size="lg"
              width="full"
              isLoading={loading}
            >
              Send Reset Link
            </Button>
          </form>
        </Box>
      </Flex>
    </Container>
  );
};

export default ForgotPassword;

"use client";

import React, { useState } from 'react';
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
import API from './utils/axiosInstance';
import Link from 'next/link';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('donar');
  const toast = useToast();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      if (!name || !email || !password || !address || !phone || !role) {
        throw new Error('Please provide all fields');
      }

      const { data } = await API.post('/auth/register', {
        name,
        email,
        password,
        address,
        phone,
        role
      });

      if (data.success) {
        toast({
          title: 'Registration Successful',
          description: 'You have successfully registered. You can now log in.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/login'); 
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error.message || 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  const getNameLabel = () => {
    switch (role) {
      case 'hospital':
        return 'Hospital Name';
      case 'organisation':
        return 'Organisation Name';
      default:
        return 'Name';
    }
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
          maxW="xl" 
          w="full"
          mx="auto"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          p={2}
        >
          <Image
            src="/images/blood-donate.png"
            alt="Blood Donate"
            boxSize="80px"
            mb={4}
            borderRadius="full"
          />
          <Text
            bgGradient='linear(to-l, #FF6347, #FF4500)'
            bgClip='text'
            fontSize='2xl'
            fontWeight='bold'
            mb={2}
          >
            Register
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl as="fieldset" mb={2}>
              <FormLabel as="legend">Select Role</FormLabel>
              <RadioGroup onChange={(value) => setRole(value)} value={role}>
                <Stack spacing={4} direction="row">
                  <Radio value="donar">Donor</Radio>
                  <Radio value="admin">Admin</Radio>
                  <Radio value="hospital">Hospital</Radio>
                  <Radio value="organisation">Organisation</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl id="name" isRequired mb={2}>
              <FormLabel>{getNameLabel()}</FormLabel>
              <Input
                type="text"
                placeholder={`Enter your ${role === 'hospital' ? 'Hospital' : role === 'organisation' ? 'Organisation' : 'Name'}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxW="400px" // Set max width for smaller fields
              />
            </FormControl>

            <FormControl id="email" isRequired mb={2}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxW="400px" 
              />
            </FormControl>

            <FormControl id="password" isRequired mb={2}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxW="400px" 
              />
            </FormControl>

            <FormControl id="address" isRequired mb={2}>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxW="400px" 
              />
            </FormControl>

            <FormControl id="phone" isRequired mb={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxW="400px" 
              />
            </FormControl>

            <Button type="submit" colorScheme="red" size="lg" width="full">
              Register
            </Button>

            <Box textAlign="center" mt={4}>
              <Text fontSize="sm">
                Already registered?{' '}
                <Link href="/login" passHref>
                  <Button variant="link" colorScheme="blue">
                    Login Here
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

export default Registration;

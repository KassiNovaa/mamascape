import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Select, Image } from '@chakra-ui/react'
import { useFormik } from 'formik';
import * as yup from 'yup';

function Signup({ setUser }) {
    const [signup, setSignup] = useState(true);

    const navigate = useNavigate();

    const signupSchema = yup.object().shape({
      firstname: yup.string().min(2, 'First name must be at least 2 characters').max(15, 'First name must not exceed 15 characters'),
      lastname: yup.string().min(2, 'Last name must be at least 2 characters').max(15, 'Last name must not exceed 15 characters'),
      username: yup.string().min(2, 'Last name must be at least 2 characters').max(15, 'Last name must not exceed 15 characters'),
      email: yup.string().email('Invalid email address').required('Email is required'),
      password: yup.string().required('Password is required').min(2, 'Last name must be at least 2 characters').max(15, 'Last name must not exceed 15 characters'),
      passwordConfirmation: yup.string().required('Confirm password').oneOf([yup.ref('password'), null], 'Passwords must match'),
    });
    const loginSchema = yup.object().shape({
      email: yup.string().required('Email is required'),
      password: yup.string().required('Password is required')
    });
  
    const formik = useFormik({
      initialValues: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        motherhood: '',
      },
      validationSchema: signup ? signupSchema : loginSchema,
      onSubmit: (values) => {
        const endpoint = signup ? '/signup' : '/login';
        fetch( endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }).then((resp) => {
          if (resp.ok) {
            resp.json().then(({ user }) => {
              setUser(user);
              navigate('/dashboard');
            });
          } else {
            console.log('error');
          }
        });
      },
    });

    function toggleSignup(){
        setSignup((currentSignup)=> !currentSignup)
    }

    return (
      <Flex width="full" align="center" justifyContent="center" minHeight="100vh" background={`url('https://img.freepik.com/free-vector/hand-drawn-leaves-floral-isolated-clipart_41066-2803.jpg?w=1800&t=st=1702016237~exp=1702016837~hmac=6828e1076cd1c221b505900917e2ee800f34dbc30836a5ed85547daffed315a1')`} backgroundSize="cover">
        
        <Box as="form" onSubmit={formik.handleSubmit} width="sm" p={4} boxShadow="dark-lg" rounded="md" bg="white">
          <Heading align='right' mb={-19}>
                <Button onClick={toggleSignup} bgGradient='linear(to-r, teal.500, green.500)' color="white" _hover={{ bg: 'green.600' }} _active={{ bg: 'green.600' }} variant="outline" >
                    {signup ? 'Login' : 'Sign up'}
                </Button>
            </Heading>
          <Flex justify="center" alignItems="center" mb={4}>
            <Image width={300} height={250} mt={-10} mb={-20} src="https://i.postimg.cc/BnJ3nDd9/mamascape-logo.png" alt="mamascape logo" />
          </Flex>
          <Heading size='md' textAlign="center" color={'green.500'} mb={8} >Create a mamascape Account</Heading>
          {signup && (
          <FormControl isRequired>
           <FormLabel>First name</FormLabel>
            < Input
              id="firstname"
              name="firstname"
              placeholder="First name"
              error={formik.errors.firstname}
              value={formik.values.firstname}
              onChange={formik.handleChange}
            />
            </FormControl>
          )}
            {signup && (
            <FormControl isRequired>
            <FormLabel>Last name</FormLabel>
            <Input
              id="lastname"
              name="lastname"
              placeholder="Last name"
              error={formik.errors.lastname}
              value={formik.values.lastname}
              onChange={formik.handleChange}
            />
            </FormControl>
            )}

            {signup && (
            <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              id="username"
              name="username"
              placeholder="Username"
              error={formik.errors.username}
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            </FormControl>
            )}
  
            <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              error={formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            </FormControl>
  
            <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              error={formik.errors.password}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            </FormControl>
            {signup && (
            <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="Confirm password"
              type="password"
              error={formik.errors.passwordConfirmation}
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
            />
            </FormControl>
            )}
            
            {signup && (
            <FormControl isRequired>
            <FormLabel>Stage of motherhood</FormLabel>
            <Select
              placeholder="Select motherhood stage"
              id="motherhood"
              name="motherhood"
              error={formik.errors.motherhood}
              value={formik.values.motherhood}
              onChange={formik.handleChange}
            >
              <option>Trying to conceive</option>
              <option>Fertility</option>
              <option>Pregnancy</option>
              <option>Infant</option>
              <option>Toddler</option>
              <option>Preschool</option>
              <option>Elementary</option>
              <option>Tween</option>
              <option>Teen</option>
              <option>Adult</option>
            </Select>
            </FormControl>
            )}
            {Object.keys(formik.errors).map((key)=> <div>{formik.errors[key]}</div>)}

            <Button mb={5} bgGradient='linear(to-r, teal.500, green.500)' color="white" _hover={{ bg: 'green.600' }} _active={{ bg: 'green.600' }} variant="outline" width="full" mt={4} type="submit">
               { signup? 'Sign up' : 'Log in' }
            </Button>
        </Box>
      </Flex>
    );
  }
  
  export default Signup;
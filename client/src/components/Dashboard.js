import React from 'react';
import { Button, Grid, GridItem, CardHeader, CardBody, Card, CardFooter, Text, Heading, SimpleGrid, Box} from '@chakra-ui/react';


function Dashboard(){


  return (
    <Grid
      templateAreas={` "main main"`}
      gridTemplateRows={'60px 1fr 30px'}
      gridTemplateColumns={'150px 1fr'}
      h='800px'
      gap='2'
      color='black'
      fontWeight='bold'
    >
      <GridItem pl='2' minHeight="100vh" background={`url('https://img.freepik.com/free-vector/hand-drawn-leaves-floral-isolated-clipart_41066-2803.jpg?w=1800&t=st=1702016237~exp=1702016837~hmac=6828e1076cd1c221b505900917e2ee800f34dbc30836a5ed85547daffed315a1')`} backgroundSize="cover"area={'main'}>
        <Card mt='2' align='center' variant='elevated' boxShadow="dark-lg">
          <CardHeader>
            <Heading size='md'>Affirmation</Heading>
          </CardHeader>
          <CardBody >
            <Text>generate random affirmation.</Text>
          </CardBody>
          <CardFooter>
            render a like button here that will save the affirmation to a list
          </CardFooter>
        </Card>
        <Box mt='6'>
          <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            <Card variant='elevated' boxShadow="xl">
              <CardHeader>
                <Heading size='md'> Customer dashboard</Heading>
              </CardHeader>
              <CardBody>
                <Text>View a summary of all your customers over the last month.</Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
            <Card variant='elevated' boxShadow="xl">
              <CardHeader >
                <Heading size='md'> Customer dashboard</Heading>
              </CardHeader>
              <CardBody>
                <Text>View a summary of all your customers over the last month.</Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
            <Card variant='elevated' boxShadow="xl">
              <CardHeader>
                <Heading size='md'> Customer dashboard</Heading>
              </CardHeader>
              <CardBody>
                <Text>View a summary of all your customers over the last month.</Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
          </SimpleGrid>
        </Box>
      </GridItem>
    </Grid>
  );
}

export default Dashboard;
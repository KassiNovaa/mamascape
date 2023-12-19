import React, {useState, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import { Grid, GridItem, CardHeader, CardBody, Card, CardFooter, Text, Heading, SimpleGrid, Box} from '@chakra-ui/react';
import AffirmationContainer from './AffirmationContainer';

function Dashboard(){

  const {user, setFavorites, favorites, affirmation, setAffirmation } = useOutletContext();
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
      <GridItem 
          pl='2' 
          minHeight="100vh" 
          background={`url('https://img.freepik.com/free-vector/hand-drawn-leaves-floral-isolated-clipart_41066-2803.jpg?w=1800&t=st=1702016237~exp=1702016837~hmac=6828e1076cd1c221b505900917e2ee800f34dbc30836a5ed85547daffed315a1')`} 
          backgroundSize="cover"
          area={'main'}>
        <Card mt='2' backgroundColor={'transparent'} align='center' boxShadow={'none'}>
          <CardHeader>
            <Heading size='md'></Heading>
          </CardHeader>
          <CardBody>
            <AffirmationContainer affirmation={affirmation} setAffirmation={setAffirmation} favorites={favorites} setFavorites={setFavorites} userId={user.id}/>
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Card>
      </GridItem>
    </Grid>
  )
}

export default Dashboard;
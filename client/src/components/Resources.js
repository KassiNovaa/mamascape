import React, { useState, useEffect } from 'react';
import { Box, Card, Heading, Text, List, ListItem, ListIcon} from '@chakra-ui/react';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch('/resources')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.links) {
          setResources(data.links);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  console.log(resources,'resources');


  return (
    <Box
      pl="2"
      minHeight="100vh"
      background={`url('https://img.freepik.com/free-vector/hand-drawn-leaves-floral-isolated-clipart_41066-2803.jpg?w=1800&t=st=1702016237~exp=1702016837~hmac=6828e1076cd1c221b505900917e2ee800f34dbc30836a5ed85547daffed315a1')`}
      backgroundSize="cover"
      area={'main'}
    >
      <Card align='left'maxW="md" mx="auto" bg="white" p={4} mt={4}>
        <Heading color="gray" size="lg">
          Resources for Mothers
        </Heading>
        <Text color='grey.400' size='md' mt={2}>Here are some resources that you may find helpful:</Text>
        <List mt={6} spacing={4}>
          {resources.map((resource) => (
            <ListItem key={resource.id}>
              <ListIcon as={FavoriteBorder} color="pink.500" boxSize={4} mr={2} />
              <a href={resource.url}>{resource.title}</a>
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
}

export default Resources;
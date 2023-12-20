import { useOutletContext } from "react-router-dom";
import FavoriteListCard from './FavoriteListCard'
import { Box, Card, Heading, Text } from "@chakra-ui/react";

function FavoriteList({}) {
  const { favorites } = useOutletContext();
  // console.log(favorites, 'hi favorites passed in the favorlist here'); // Check the value of favorites

  const favoritesList = favorites.map(favorite => (
    <FavoriteListCard key={favorite.id} favorite={favorite} quote={favorite.affirmation.quote} />
  ));
  return (
    <Box
    pl="2"
    minHeight="100vh"
    background={`url('https://img.freepik.com/free-vector/hand-drawn-leaves-floral-isolated-clipart_41066-2803.jpg?w=1800&t=st=1702016237~exp=1702016837~hmac=6828e1076cd1c221b505900917e2ee800f34dbc30836a5ed85547daffed315a1')`}
    backgroundSize="cover"
    area={'main'}
  >

    <Card align='left'maxW="md" mx="auto" bg="white" p={4} mt={4}>
      <Heading mt={4} fontSize='3xl' color='grey' fontFamily='Bree Serif'> Favorite Affirmations List </Heading>
      <Text mt={4}>
          {favoritesList}
      </Text>
    </Card>
    </Box>
  );
}

export default FavoriteList;

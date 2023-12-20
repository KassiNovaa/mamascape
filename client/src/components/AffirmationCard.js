import { Button, Card, CardBody, Flex, Stack, Text, ButtonGroup, CardFooter, isDisabled } from "@chakra-ui/react";
import { BiLike, BiStar } from "react-icons/bi";

function AffirmationCard({ quote, like_count, id, setAffirmation, userId, setFavorites, isFavorited, setIsFavorited }) {

  const handleLikeButton = () => {
    fetch(`/affirmation/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ like_count: like_count +1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAffirmation(data.favorite);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }; 

  const handleFavoriteButton = () => {
    fetch(`/users/${userId}/favorites`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId , affirmation_id: id }),
    })
      .then((response) => {
        if (response.status === 409) {
          // console.log('Favorite already exists');
        } else if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then((newFavorite) => {
        if (newFavorite) {
          setFavorites((prevFavorites) => [...prevFavorites, newFavorite.favorite ]);
          setIsFavorited(newFavorite.favorite.id);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
<Card background='#F0FFF4' maxW='sm'>
  <CardBody>
    <Flex flexDirection="column" alignItems="center">
      <Stack mt='6' spacing='3'>
        <Text aligm='center' fontSize='3xl' color='grey' fontFamily='Bree Serif' fontStyle='italic' >
          {quote}
        </Text>
      </Stack>
      <CardFooter>
        <ButtonGroup align='center' size='' spacing='2'>
          <Button onClick={handleLikeButton} variant='ghost' colorScheme='green' leftIcon={<BiLike/>} >
            likes: {like_count}
          </Button>
           <Button onClick={handleFavoriteButton} isDisabled={isFavorited} variant='ghost' colorScheme='yellow' leftIcon={<BiStar/>}>
            Favorite
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Flex>
  </CardBody>
</Card>
  );
}

export default AffirmationCard;

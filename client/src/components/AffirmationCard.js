import { Button, Card, CardBody, Flex, Stack, Text, ButtonGroup, CardFooter, isDisabled } from "@chakra-ui/react";
import { BiLike, BiStar } from "react-icons/bi";

function AffirmationCard({ quote, like_count, id, setAffirmation, userId, setFavorites, favorites, isFavorited, setIsFavorited }) {

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

  // look at whats in favorite obj and if the affirmation id is in there then disable the button. set isfavorited to true.

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
          console.log('Favorite already exists');
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
<Card maxW='sm'>
  <CardBody>
    <Flex flexDirection="column" alignItems="center">
      <Stack mt='6' spacing='3'>
        <Text aligm='center' fontSize='3xl' color='green.600'>
          {quote}
        </Text>
      </Stack>
      <CardFooter>
        <ButtonGroup align='center' size='' spacing='2'>
          <Button onClick={handleLikeButton} variant='ghost' colorScheme='pink' leftIcon={<BiLike/>} >
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

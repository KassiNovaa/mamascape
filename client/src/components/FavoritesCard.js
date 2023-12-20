import { Button, Box, List, ListItem, ListIcon } from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import { useOutletContext } from "react-router-dom";

function FavoritesCard() {

    const { handleRemoveButton } = useOutletContext();
    
    // const handleRemoveButton = () => {        
    //     fetch(`/users/favorites/${userId}/${favorite_id}`, {
    //       method: 'DELETE',
    //     })
    //       .then((r) => {
    //         console.log('Fetch response:', r);
    //         if (!r.ok) {
    //           throw new Error(`HTTP error! Status: ${r.status}`);
    //         }
    //       })
    //       .then(() => {
    //         setFavorites((prevFavorites) =>
    //           prevFavorites.filter((fav) => fav.id !== favorite_id)
    //         );
    //       })
    //       .catch((error) => {
    //         console.error('Error:', error);
    //       });

    //       setIsFavorited(false);
    //   };


  return (
    <Box bg={'white'} mt='6' >
        <List spacing={3} >
            <ListItem>
                <ListIcon as={MdCheckCircle} color='green.500' />
                Affirmation has been added to Favorites   
                <Button as='span' onClick={handleRemoveButton} colorScheme='red' fontSize='small' size='xs' > Remove </Button>
            </ListItem>
        </List>
    </Box>

  ) }
     

export default FavoritesCard;
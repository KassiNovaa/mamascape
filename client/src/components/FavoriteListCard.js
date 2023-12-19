import React from 'react';
import { Box, Card, CardBody, IconButton, Tooltip } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function FavoriteListCard({ favorite, quote, onDelete }) {
  const handleDelete = () => {
    onDelete(favorite.id);
  };

  return (
    <Card maxW="sm">
      <CardBody>
        <Box as="h3" fontSize="xl" fontWeight="bold">
          {quote}
        </Box>
        <p>{favorite.description}</p>
      </CardBody>

      <Box borderTopWidth="1px" borderTopColor="gray.200" p={2}>
        <Tooltip label="Delete">
          <IconButton
            colorScheme="red"
            aria-label="Delete favorite affirmation"
            icon={<DeleteIcon />}
            onClick={handleDelete}
          />
        </Tooltip>
      </Box>
    </Card>
  );
}

export default FavoriteListCard;
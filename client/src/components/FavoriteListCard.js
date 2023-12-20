import React from 'react';
import { Box, Card, CardBody, IconButton, Tooltip } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useOutletContext } from "react-router-dom";

function FavoriteListCard({ favorite, quote }) {

  const { handleRemoveButton } = useOutletContext();

  return (
    <Card maxW="sm">
      <CardBody display="flex" alignItems="center">
        <Box as="h3" fontSize="md" flex="1">
          {quote}
        </Box>
        <Tooltip label="Delete">
          <IconButton
            colorScheme="red"
            aria-label="Delete favorite affirmation"
            icon={<DeleteIcon size="xs" />}
            onClick={handleRemoveButton}
          />
        </Tooltip>
      </CardBody>
    </Card>
  );
}

export default FavoriteListCard;
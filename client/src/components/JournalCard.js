import React, { useState } from 'react';
import { Box, Button, Card, CardBody, IconButton, Tooltip } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

function JournalCard({ journalEntry }) {
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent(!showContent);
  };

  const handleEdit = () => {
    fetch(`/api/v1/journals/${journalEntry.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ /* Update the properties you want to change */ }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Handle successful update if needed
        console.log('Edit journal entry:', journalEntry.id);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      
  };

  const handleDelete = () => {
    fetch(`/api/v1/journals/${journalEntry.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Handle successful deletion if needed
        console.log('Delete journal entry:', journalEntry.id);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Card>
      <CardBody>
        <h3>{journalEntry.title}</h3>
        <p>{journalEntry.date}</p>
        {showContent && <p>{journalEntry.content}</p>}
      </CardBody>

      <Box borderTopWidth="1px" borderTopColor="gray.200" p={2}>
        <Button
          colorScheme="teal"
          size="sm"
          leftIcon={<EditIcon />}
          mr={2}
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Tooltip label="Delete">
          <IconButton
            colorScheme="red"
            aria-label="Delete journal entry"
            icon={<DeleteIcon />}
            onClick={handleDelete}
          />
        </Tooltip>
      </Box>
    </Card>
  );
}

export default JournalCard;
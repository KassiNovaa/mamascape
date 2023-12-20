import React, { useState } from 'react';
import { Box, Button, Card, CardBody, Flex, Heading, IconButton, SimpleGrid, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Editjournal from './EditJournal';

function JournalCard({ journalEntry, setJournalEntries }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = () => {
    fetch(`journals/${journalEntry.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setJournalEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== journalEntry.id));
        console.log('Delete journal entry:', journalEntry.id);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
  <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
      <Card width="sm" margin={4} p={2} boxShadow="dark-lg" rounded="md" bg="white" maxW="sm">
        <CardBody>
          <Flex justify="space-between" align="center" mb={2} >
            <Text justify="center" align="center" fontFamily='Bree Serif' fontWeight='bold' size='md' >{journalEntry.title} : {journalEntry.date} </Text>
          </Flex>
          <p>{journalEntry.content}</p>
        </CardBody>

        <Box borderTopColor="gray.200">
          <Flex justify="center" align="center">
            <Button
              colorScheme="teal"
              size="sm"
              leftIcon={<EditIcon />}
              mr={2}
              onClick={onOpen}
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
          </Flex>
        </Box>
      </Card>
      <Editjournal isOpen={isOpen} onOpen={onOpen} onClose={onClose} journalEntry={journalEntry} setJournalEntries={setJournalEntries} />
    </SimpleGrid>
  );
}

export default JournalCard;
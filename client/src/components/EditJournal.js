import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Textarea, useDisclosure, Select, Icon } from '@chakra-ui/react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useOutletContext } from 'react-router-dom';

function Editjournal({isOpen, onOpen, onClose, journalEntry, setJournalEntries } ){

    const { user } = useOutletContext();

        const editEntrySchema = yup.object().shape({
            date: yup.date(),
            title: yup.string(),
            entry: yup.string(),
          });
          console.log(journalEntry, 'journalEntry im here')

          const formik = useFormik({
            initialValues: {
              title: journalEntry.title,
              entry: journalEntry.entry,
              date: journalEntry.date,
              user_id: user ? user.id : '',
            },
            validationSchema: editEntrySchema,
            onSubmit: (values) => {
              console.log('Submitting form with values:', values);
              fetch(`journals/${journalEntry.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              }).then((resp) => {
                  console.log('Fetch response:', resp)
                if (resp.ok) {
                  resp.json().then(( updatedEntry ) => {
                    setJournalEntries((allCurrEntry)=> allCurrEntry.map((currEntry)=> currEntry.id === updatedEntry.id ? updatedEntry : currEntry ))
                    onClose(true);
                    console.log('updated entry successfully', updatedEntry)
                  });
                } else {
                  console.log('error updating entry');
                }
              });
            },
          });

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Flex width="full" align="center" justifyContent="center" minHeight="100vh" background={`url('https://img.freepik.com/free-vector/hand-drawn-leaves-floral-isolated-clipart_41066-2803.jpg?w=1800&t=st=1702016237~exp=1702016837~hmac=6828e1076cd1c221b505900917e2ee800f34dbc30836a5ed85547daffed315a1')`} backgroundSize="cover">
        <Box mb={10} width="sm" p={6} boxShadow="dark-lg" rounded="md" bg="white">
          <Heading align='center' size='lg' fontFamily='Bree Serif' fontStyle='italic' color='grey' >Journal Entry</Heading>
          <form onSubmit={formik.handleSubmit}>
            <FormControl isRequired>
              <FormLabel> Date </FormLabel>
              <Input
                id="date"
                name="date"
                size="md"
                type="datetime-local"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>
  
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Textarea
                id="title"
                name="title"
                placeholder="Title"
                size="sm"
                type="text"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>
  
            <FormControl isRequired>
              <Textarea
                id="entry"
                name="entry"
                placeholder="I'm here to listen mama ..."
                size="sm"
                type="text"
                value={formik.values.entry}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormControl>
  
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Flex>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )

}

export default Editjournal;
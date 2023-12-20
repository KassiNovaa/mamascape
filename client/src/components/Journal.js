import {useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Textarea, Select, Icon } from '@chakra-ui/react'
import { useFormik } from 'formik';
import * as yup from 'yup';


function JournalPage() {

  // create a container for the journal entries to map through and create a component for each entry and have a edit button and delete button

    const [newEntry, setNewEntry] = useState(true);
    const [currentEntry, setCurrentEntry] = useState('');
    
    const navigate = useNavigate();

    const { user, setJournalEntries } = useOutletContext();
    console.log(user, 'user')
  
    const newEntrySchema = yup.object().shape({
      date: yup.date().required('Date is required'),
      title: yup.string().required('Title is required'),
      entry: yup.string().required('Entry is required'),
    });
  
    const formik = useFormik({
      initialValues: {
        title: '',
        entry: '',
        date: '',
        user_id: user ? user.id : '',
      },
      validationSchema: newEntrySchema,
      onSubmit: (values) => {
        console.log('Submitting form with values:', values);
        fetch('/journals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }).then((resp) => {
            console.log('Fetch response:', resp)
          if (resp.ok) {
            resp.json().then(({ journal }) => {
              setJournalEntries((allCurrEntry)=> [...allCurrEntry, journal])
              navigate('/myjournal');
            });
          } else {
            console.log('error');
          }
        });
      },
    });
  
    function handleNewEntry() {
      setNewEntry((currentNewEntry) => !currentNewEntry);
    }
  
    return (
    <Flex width="full" align="center" justifyContent="center" minHeight="100vh" background={`url('https://img.freepik.com/free-vector/hand-drawn-leaves-floral-isolated-clipart_41066-2803.jpg?w=1800&t=st=1702016237~exp=1702016837~hmac=6828e1076cd1c221b505900917e2ee800f34dbc30836a5ed85547daffed315a1')`} backgroundSize="cover">
        <Box mb={10} width="sm" p={6} boxShadow="dark-lg" rounded="md" bg="white">
          <Heading align='center' size='lg' fontFamily='Bree Serif' fontStyle='italic' color='grey' >Journal Entry</Heading>
          <form onSubmit={formik.handleSubmit}>
            <FormControl isRequired>
              <FormLabel> Date</FormLabel>
              <Input
                id="date"
                name="date"
                placeholder="Select Date and Time"
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
      
    );
  }

  export default JournalPage;
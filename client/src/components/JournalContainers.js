import { useOutletContext } from "react-router-dom";
import JournalCard from "./JournalCard";
import { Box, Heading} from "@chakra-ui/react";

function JournalEntries() {
  const { journalEntries, setJournalEntries } = useOutletContext();
  console.log(journalEntries); // Check the value of journalEntries

  const journalEntriesList = journalEntries.map(journalEntry => (
    <JournalCard key={journalEntry.id} journalEntry={journalEntry} setJournalEntries={setJournalEntries}/>
  ));

  return (
    <Box minHeight="100vh" background={`url('https://img.freepik.com/free-vector/hand-drawn-leaves-floral-isolated-clipart_41066-2803.jpg?w=1800&t=st=1702016237~exp=1702016837~hmac=6828e1076cd1c221b505900917e2ee800f34dbc30836a5ed85547daffed315a1')`} backgroundSize="cover">
      <Heading backdropContrast='30%' marginLeft="20px" bgGradient='linear(to-r, teal.500, green.500)' p='4' mt={4} mb={6} size='xl' fontFamily='Bree Serif' fontStyle='italic' color='white' > Your Journal Entries</Heading>
      {journalEntriesList}
    </Box>
  );
}

export default JournalEntries;
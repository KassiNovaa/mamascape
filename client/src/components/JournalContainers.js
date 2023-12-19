import { useOutletContext } from "react-router-dom";
import JournalCard from "./JournalCard";

function JournalEntries() {
  const { journalEntries } = useOutletContext();
  console.log(journalEntries); // Check the value of journalEntries

  const journalEntriesList = journalEntries.map(journalEntry => (
    <JournalCard key={journalEntry.id} journalEntry={journalEntry} />
  ));

  return (
    <div>
      <h1>Journal Entries</h1>
      {journalEntriesList}
    </div>
  );
}

export default JournalEntries;
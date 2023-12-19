import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Signup from './Signup';
import Navbar from './Navbar';



function App() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [affirmation, setAffirmation] = useState([]);

  useEffect(() => {
    fetch('/authorized')
    .then((r)=>{
      if(r.ok){
        r.json().then((user)=> setUser(user))
      } else{
        // handle what should happen?
        console.log('error')
      }
    })
  },[])

  useEffect(() => {
    fetch('/affirmation')
        .then((r) => r.json())
        .then((affirmationObj) => {
          console.log(affirmationObj, 'affirmationObj');
            setAffirmation(affirmationObj["affirmation"]);
            console.log(affirmation, 'affirmation');
        });
  }, []);

  useEffect(() => { 
    if (user){
      fetch(`/users/${user.id}/favorites`)
        .then((r) => r.json())
        .then((favorites) => {
          setFavorites(favorites);
        });
    }
    },[user]);

    useEffect(() => {
      fetch('/journals')
        .then((r) => r.json())
        .then((data) => {
          console.log(data); // Check the fetched data
          setJournalEntries(data.journals);
        })
        .catch((error) => console.log(error));
    }, []);
  

  if (!user) {
    return (
      <ChakraProvider>
        <Signup setUser={setUser} />
      </ChakraProvider>
    );
  }

  const context = {
    user,
    setUser,
    favorites,
    setFavorites,
    journalEntries,
    setJournalEntries,
    affirmation,
    setAffirmation
  };
  


  return (
    <ChakraProvider>
      <Navbar user={user} setUser={setUser} />
      <Outlet context = {context}/>
    </ChakraProvider>
  );
}

export default App;

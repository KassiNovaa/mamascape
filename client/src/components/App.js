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
  const [isFavorited, setIsFavorited] = useState(false);

  // console.log(favorites, 'favorites in app.js')

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

  const handleRemoveButton = () => {        
    fetch(`/users/favorites/${user.id}/${isFavorited}`, {
      method: 'DELETE',
    })
      .then((r) => {
        console.log('Fetch response:', r);
        if (!r.ok) {
          throw new Error(`HTTP error! Status: ${r.status}`);
        }
      })
      .then(() => {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.id !== isFavorited)
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      setIsFavorited(false);
  };

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
    setAffirmation,
    isFavorited,
    setIsFavorited,
    handleRemoveButton
  };
  


  return (
    <ChakraProvider>
      <Navbar user={user} setUser={setUser} />
      <Outlet context = {context}/>
    </ChakraProvider>
  );
}

export default App;

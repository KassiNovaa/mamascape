import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Signup from './Signup';
import Navbar from './Navbar';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/authorized')
    .then((resp)=>{
      if(resp.ok){
        resp.json().then((user)=> setUser(user))
      } else{
        // handle what should happen?
        console.log('error')
      }
    })
  },[])
  

  if (!user) {
    return (
      <ChakraProvider>
        <Signup setUser={setUser} />
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Navbar user={user} setUser={setUser} />
      <Outlet />
    </ChakraProvider>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import {auth} from 'fbase';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true)
    });
  }, [])
  // setInterval(() => {
  //   console.log(auth.currentUser);
  // }, 2000);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}
      <footer>&copy; { new Date().getFullYear() } Jwitter</footer>
    </>
  )
}

export default App;
 
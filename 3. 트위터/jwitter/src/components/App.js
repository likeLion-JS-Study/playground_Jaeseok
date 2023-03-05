import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { auth } from 'fbase';
import { onAuthStateChanged } from "firebase/auth";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true)
    });
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : 'Initializing...'}
      <footer>&copy; { new Date().getFullYear() } Jwitter</footer>
    </>
  )
}

export default App;
 
import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { auth } from 'fbase';
import { onAuthStateChanged, updateProfile } from "firebase/auth";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user,
            { displayName: user.displayName }),
        });
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true)
    });
  }, [])
  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
    });
  }
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser} /> : 'Initializing...'}
      {/* <footer>&copy; { new Date().getFullYear() } Jwitter</footer> */}
    </>
  )
}

export default App;
 
import React, { useState } from 'react';
import AppRouter from 'components/Router';
import {auth} from 'fbase';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; { new Date().getFullYear() } Jwitter</footer>
    </>
  )
}

export default App;
 
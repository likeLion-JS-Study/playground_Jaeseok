import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";


const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAcount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onChange = (e) => {
    const { target: { name, value } } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAcount) {
        // create 
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // log in
        data = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount(prev => !prev);
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name='email'
          type="text"
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name='password'
          type="password"
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input type="submit" value={newAcount ? "Create Account" : "Log In"} />
        {error && <span className="authError">{error}</span> }
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAcount ? 'Sign In' : 'Create Account'}
      </span>
    </>
  )
}

export default AuthForm;
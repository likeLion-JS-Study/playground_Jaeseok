import React, { useState } from 'react';
import { dbService } from 'fbase';
import { collection, addDoc } from "firebase/firestore";


const Home = () => {
  const [jweet, setJweet] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dbService, "jweet"), {
        jweet,
        createdAt: Date.now(),
      });
      setJweet('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  const onChange = (e) => {
    const { target: { value } } = e;
    setJweet(value);
  }
  return (
    <form onSubmit={onSubmit}>
      <input value={jweet} onChange={onChange} type="text" placeholder="What's on your mind" maxLength={120} />
      <input type="submit" value="Jweet" />
    </form>
  )
};

export default Home;
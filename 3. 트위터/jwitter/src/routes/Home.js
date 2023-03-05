import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import { collection, addDoc, getDocs, query  } from "firebase/firestore";


const Home = () => {
  const [jweet, setJweet] = useState('');
  const [jweets, setJweets] = useState([]);
  const getJweets = async () => {
    const q = query(collection(dbService, "jweet"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const jweetObj = {
        ...doc.data(),
        id: doc.id
      }
      setJweets(prev => [jweetObj, ...prev])
    })
  };
  useEffect(() => {
    getJweets();
  }, [])
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
    <>
      <form onSubmit={onSubmit}>
        <input value={jweet} onChange={onChange} type="text" placeholder="What's on your mind" maxLength={120} />
        <input type="submit" value="Jweet" />
      </form>
      <div>
        {jweets.map((jweet) => (
          <div key={jweet.id}>
            <h4>{jweet.jweet}</h4>
          </div>
        ))}
      </div>
    </>
  )
};

export default Home;
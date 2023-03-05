import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import Jweet from 'components/Jweet';

const Home = ({ userObj }) => {
  const [jweet, setJweet] = useState('');
  const [jweets, setJweets] = useState([]);
  useEffect(() => {
    const q = query(collection(dbService, "jweets"));
    onSnapshot(q, (snapshot) => {
      const jweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJweets(jweetArray)
    })
  }, [])
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dbService, "jweets"), {
        text: jweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
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
          <Jweet
            key={jweet.id}
            jweetObj={jweet}
            isOwner={jweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  )
};

export default Home;
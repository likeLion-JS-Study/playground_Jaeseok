import React, { useState, useEffect } from 'react';
import { dbService, storageService } from 'fbase';
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import Jweet from 'components/Jweet';
import { v4 as uuidv4 } from 'uuid';


const Home = ({ userObj }) => {
  const [jweet, setJweet] = useState('');
  const [jweets, setJweets] = useState([]);
  const [attachment, setAttachment] = useState(null);
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
    let attachmentUrl = '';
    if (attachment != '') {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }
    try {
      await addDoc(collection(dbService, "jweets"), {
        text: jweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl 
      });
      setJweet('');
      setAttachment('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  const onChange = (e) => {
    const { target: { value } } = e;
    setJweet(value);
  };
  const onFileChange = (e) => {
    const { target: { files } } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: {result} } = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }
  const onClearAttachment = () => setAttachment(null)
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={jweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind"
          maxLength={120} />
        <input type="file" accept='image/*' onChange={onFileChange} />
        <input type="submit" value="Jweet" />
        {attachment && (
          <div>
            <img src={attachment} alt="ex" width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
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
import React, { useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth, dbService } from 'fbase';
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Profile = ({userObj}) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(auth);
    navigate('/');
  };
  const getMyJweets = async () => {
    const q = query(collection(dbService, "jweets"), where("creatorId", "==", userObj.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }
  
  useEffect(() => {
    getMyJweets();
  }, [])
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
};

export default Profile;
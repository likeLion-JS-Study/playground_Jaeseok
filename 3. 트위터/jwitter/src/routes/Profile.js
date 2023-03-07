import React, { useState } from 'react';
import { signOut, updateProfile } from "firebase/auth";
import { auth, dbService } from 'fbase';
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Profile = ({userObj, refreshUser}) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    signOut(auth);
    navigate('/');
  };
  const onChange = (e) => {
    const { target: { value } } = e;
    setNewDisplayName(value);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName
      });
      refreshUser();
    }
  };
  // const getMyJweets = async () => {
  //   const q = query(collection(dbService, "jweets"), where("creatorId", "==", userObj.uid));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // }
  // useEffect(() => {
  //   getMyJweets();
  // }, [])
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder='Display Name'
          value={newDisplayName}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Update Profile"
        />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
};

export default Profile;
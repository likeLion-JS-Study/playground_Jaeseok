import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from "fbase";

const Jweet = ({ jweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJweet, setNewJweet] = useState(jweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this jweet?');
    const JweetTextRef = doc(dbService, "jweets", `${jweetObj.id}`);
    if (ok) {
      await deleteDoc(JweetTextRef);
    }
  };
  const toogleEditing = () => setEditing(prev => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    const JweetTextRef = doc(dbService, "jweets", `${jweetObj.id}`);
    await updateDoc(JweetTextRef, {
      text: newJweet,
    });
    setEditing(false);
  }
  const onChange = (e) => {
    const { target: { value } } = e;
    setNewJweet(value);
  }
  return (
    <div>
      {
        editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Edit your nweet"
                value={newJweet}
                onChange={onChange}
                required
              />
              <input type="submit" value="Update Jweet" />
            </form>
            <button onClick={toogleEditing}>Cancel</button>
          </>
          ) : (
          <>
              <h4>{jweetObj.text}</h4>
              {jweetObj.attachmentUrl && <img src={jweetObj.attachmentUrl} alt="ex" width="50px" height="50px" />}
            {isOwner &&
              <>
                <button onClick={onDeleteClick}>Delete Jweet</button>
                <button onClick={toogleEditing}>Edit Jweet</button>
              </>
            }
          </>
        )
      }
    </div>
  )
};

export default Jweet;
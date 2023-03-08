import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Jweet = ({ jweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newJweet, setNewJweet] = useState(jweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this jweet?');
    const JweetTextRef = doc(dbService, "jweets", `${jweetObj.id}`);
    const urlRef = ref(storageService, jweetObj.attachmentUrl);
    if (ok) {
      try {
        await deleteDoc(JweetTextRef);
        if (jweetObj.attachmentUrl !== "") {
          await deleteObject(urlRef);
        }
      } catch (error) {
        window.alert("트윗을 삭제하는 데 실패했습니다!");
      }
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
    <div className="nweet">
      {
        editing ? (
          <>
            <form onSubmit={onSubmit} className="container nweetEdit">
              <input
                type="text"
                placeholder="Edit your nweet"
                value={newJweet}
                autoFocus
                required
                onChange={onChange}
                className="formInput"
              />
              <input type="submit" value="Update Jweet" className="formBtn" />
            </form>
            <span onClick={toogleEditing} className="formBtn cancelBtn">Cancel</span>
          </>
          ) : (
          <>
              <h4>{jweetObj.text}</h4>
              {jweetObj.attachmentUrl && <img src={jweetObj.attachmentUrl} alt="ex" />}
            {isOwner &&
              <div className="nweet__actions">
                <span onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></span>
                <span onClick={toogleEditing}><FontAwesomeIcon icon={faPencilAlt} /></span>
              </div>
            }
          </>
        )
      }
    </div>
  )
};

export default Jweet;
/** @format */

import { useEffect, useState } from "react";
import { db, auth, storage } from "./../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { ref, uploadBytes } from "firebase/storage";

export const Movies = () => {
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleasedDate, setNewReleasedDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // Updated state
  const [updatedTitle, setUpdatedTitle] = useState("");

  //File Upload State
  const [fileUpload, setFileUpload] = useState(null);

  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  const updateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await updateDoc(movieDoc, { title: updatedTitle });
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleasedDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser.uid,
      });
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="Movie title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Released date"
          type="number"
          onChange={(e) => setNewReleasedDate(e.target.value)}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      {movieList.map((movie) => (
        <div>
          <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
            {movie.title}
          </h1>
          <p> Date: {movie.releaseDate}</p>
          <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
          <input
            placeholder="New title..."
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <button onClick={() => updateMovie(movie.id)}>Update title</button>
        </div>
      ))}

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload file </button>
      </div>
    </div>
  );
};

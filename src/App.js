import './App.css';
import { Auth } from './components/auth';
import { useEffect,useState } from 'react';
import {db} from  './config/firebase';
import { getDocs,collection } from 'firebase/firestore';
import { Movies } from './components/movies';


function App() {




  return (
    <div className="App">
      Firebase Course
      <Auth />
      <Movies />
    </div>
  );
}

export default App;

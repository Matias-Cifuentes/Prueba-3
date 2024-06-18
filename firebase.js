// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot,updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBX9_Dx1I9ljy-roi38c9cTDXlBwH24dQM",
    authDomain: "gestion-estudiantes-850a6.firebaseapp.com",
    projectId: "gestion-estudiantes-850a6",
    storageBucket: "gestion-estudiantes-850a6.appspot.com",
    messagingSenderId: "932067622217",
    appId: "1:932067622217:web:2aaa57b00fa9741a756e98"
  };
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const save = (est) => {
    addDoc(collection(db, 'Estudiantes'), est)
}

export const getData = (data) => {
    onSnapshot(collection(db, 'Estudiantes'), data)
}

export const eliminar = (id) =>{
    deleteDoc(doc(db,'Estudiantes',id))
}
 
export const obtener = (id) => getDoc(doc(db,'Estudiantes',id))

export const update = (id,estudiante) =>{
    updateDoc(doc(db,'Estudiantes',id),estudiante)
}

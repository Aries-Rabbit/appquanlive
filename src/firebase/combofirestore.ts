

// Kết nối đến collection của Combo tickets
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNjXqj6K7fblkLJpKsyHGBHdluLOqWGuo",
  authDomain: "fir-project1-5b249.firebaseapp.com",
  databaseURL: "https://fir-project1-5b249-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-project1-5b249",
  storageBucket: "fir-project1-5b249.appspot.com",
  messagingSenderId: "1073791247770",
  appId: "1:1073791247770:web:f112471c8b9db6548cc623",
  measurementId: "G-6BF1ZDRLJD"
};

const store = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();

const comboStore = store.collection('combotickets')

// Kết nối đến tickets
const comboapi = {
  fetchAll: <T>(): Promise<T[] | firebase.firestore.DocumentData[] | undefined> =>  {
    const combodata =  comboStore.get().then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData | T>) => {
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})) 
    })
    return combodata
  },
  fetchOne: <T>(id: string): Promise<T | firebase.firestore.DocumentData | undefined> => {
    const combodata = comboStore.doc(id).get().then((doc) => {
      return doc.data()
    })
    console.log("task with id: ", combodata)
    return combodata
  },
}


console.log(comboapi.fetchAll)

export default comboapi;
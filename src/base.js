import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAWJpq2HN2xjpYOyj0UNMiKpPRyZfzrxys",
    authDomain: "catch-of-the-day-derek-p.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-derek-p.firebaseio.com",
    // from firebase get started web app

});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export

export default base;
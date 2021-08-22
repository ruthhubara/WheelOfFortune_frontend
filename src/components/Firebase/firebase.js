import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDDCITrfDcIscuagzyL9BxVjJknwiTFw8g",
    authDomain: "wheeloffortuneproject.firebaseapp.com",
    projectId: "wheeloffortuneproject",
    storageBucket: "wheeloffortuneproject.appspot.com",
    messagingSenderId: "258122718877",
    appId: "1:258122718877:web:27ad8cefca17596e7afe74",
    measurementId: "G-TMX97N0P58"

};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
            return userCredential.user;
        });
    doSignInWithGoogle = () => {
        return new Promise((resolve, reject) => {
            let provider = new app.auth.GoogleAuthProvider();
            // provider.setCustomParameters({ prompt: "select_account" });
            this.auth.signInWithPopup(provider)
                .then((result) => {
                    resolve(result.user);
                }).catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    reject(error)
                    // ...
                });
        })
    }

}

export default Firebase;
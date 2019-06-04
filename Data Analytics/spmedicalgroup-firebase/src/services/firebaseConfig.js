import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD8IxnoMvdXMrjn09jkH6Q0NzYJtYEq9kI",
    authDomain: "spmedicalgroup-jefferson.firebaseapp.com",
    databaseURL: "https://spmedicalgroup-jefferson.firebaseio.com",
    projectId: "spmedicalgroup-jefferson",
    storageBucket: "spmedicalgroup-jefferson.appspot.com",
    messagingSenderId: "907325726789",
    appId: "1:907325726789:web:5454cd6d6a72b933"
};

firebase.initializeApp(config);

export default firebase;
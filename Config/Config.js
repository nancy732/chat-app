import Firebase from 'react-native-firebase';
let config = {
    apiKey: 'AIzaSyBdnZBofU36kWkZ-c5vjDKwucmb2mQwYIM',
    authDomain: 'chatbox-356d3.firebaseio.com',
    databaseURL: 'https://chatbox-356d3.firebaseio.com',
    projectId: 'chatbox-356d3',
    storageBucket: 'chatbox-356d3.appspot.com',
    messagingSenderId: '668661927229'
};
//if (!Firebase.app.length)
//Firebase.initializeApp(firebaseConfig);

//export default Firebase;
let App = Firebase.initializeApp(config);
// export const db = App.database();
// export const Auth = App.auth();
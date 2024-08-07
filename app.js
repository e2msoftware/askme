// Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const functions = firebase.functions();

// Sign In with Google
document.getElementById('sign-in-button').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        const user = result.user;
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('delete-container').style.display = 'block';
    }).catch((error) => {
        console.error(error);
    });
});

// Delete User Data
document.getElementById('delete-button').addEventListener('click', () => {
    const user = auth.currentUser;
    if (user) {
        const deleteUserData = firebase.functions().httpsCallable('deleteUserData');
        deleteUserData({ uid: user.uid }).then((result) => {
            console.log(result.data);
            auth.signOut().then(() => {
                document.getElementById('auth-container').style.display = 'block';
                document.getElementById('delete-container').style.display = 'none';
            }).catch((error) => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        });
    }
});

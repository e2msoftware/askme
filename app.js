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

// Sign In with Email/Password
document.getElementById('sign-in-button').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        const user = userCredential.user;
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('delete-container').style.display = 'block';
    }).catch((error) => {
        console.error(error);
    });
});

// Delete User Data
document.getElementById('delete-button').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const deleteUserData = firebase.functions().httpsCallable('deleteUserData');
    deleteUserData({ email: email, password: password }).then((result) => {
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
});

// Firebase config
        const firebaseConfig = {
            apiKey: "AIzaSyBLpa-NuuEoeNjvZlwgf2e6Tx_qMcbQkJs",
            authDomain: "sorusor-f8f0f.firebaseapp.com",
            projectId: "sorusor-f8f0f",
            storageBucket: "gs://sorusor-f8f0f.appspot.com",
            messagingSenderId: "812964088787",
            appId: "1:812964088787:android:c62acddbedd68f6b71bd26",
            databaseURL: "https://sorusor-f8f0f-default-rtdb.firebaseio.com"
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

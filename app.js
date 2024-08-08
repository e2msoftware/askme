
        // Firebase yapılandırma kodunu buraya yapıştırın
        const firebaseConfig = {
            apiKey: "AIzaSyBLpa-NuuEoeNjvZlwgf2e6Tx_qMcbQkJs",
            authDomain: "sorusor-f8f0f.firebaseapp.com",
            projectId: "sorusor-f8f0f",
            storageBucket: "gs://sorusor-f8f0f.appspot.com",
            messagingSenderId: "812964088787",
            appId: "1:812964088787:android:c62acddbedd68f6b71bd26",
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

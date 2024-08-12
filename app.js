const firebaseConfig = {
    // Firebase Application configure code
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

var email = "ms471841@gmail.com";
var password = "12345678";

function signIn() {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("Sign In SuccessFul!");
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

function DeleteUser() {
    const user = firebase.auth().currentUser;

    user
        .delete()
        .then(() => {
            // User deleted.
            console.log("User Account Deleted Successful");
        })
        .catch((error) => {
            // An error occurred
            // ...
        });
}

import * as firebase  from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FacebookAuthProvider, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";

export const initializeLogIn = () => {
    firebase.initializeApp(firebaseConfig)
}


//Google logIn logOut
export const handleGoogleSignIn = () =>{
    const GoogleProvider = new GoogleAuthProvider();
    const auth = getAuth();
   return signInWithPopup(auth, GoogleProvider)
    .then((result) => {
    const {displayName, photoURL, email} = result.user
    const isGoogleSignedIn = {
      isGoogleSignedIn: true,
      name: displayName,
      photo: photoURL,
      email: email,
      success: true
    }
     return isGoogleSignedIn
    })
    .catch((error) => { 
      var errorMessage = error.message; 
      return errorMessage
  });
  }
// google sign out use
   export const handleGoogleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
    const isGoogleSignOutUser = {
      isGoogleSignedIn: false,
    name: '',
    photo: '',
    email: '',
    success: false,
    }
    return isGoogleSignOutUser;
  })
  .catch((error) => {
    var errorMessage = error.message;
    return errorMessage

  });
  }


  //facebook logIn logOut
  export const handleFacebookSignIn = () => {
    const FacebookProvider = new FacebookAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, FacebookProvider)
    .then((result) => {
      const {displayName, photoURL, email} = result.user
      const isFbSignedIn = {
        isFbSignedIn: true,
        name: displayName,
        photo: photoURL,
        email: email,
        success: true
      }
        return isFbSignedIn
        // console.log(isFbSignedIn);
      })
      .catch((error) => { 
        var errorMessage = error.message; 
       return errorMessage
    });
    }

    export const handleFacebookSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
        const isFacebookSignOutUser = {
          isGoogleSignedIn: false,
        name: '',
        photo: '',
        email: '',
        
        }
        return isFacebookSignOutUser;
      })
      .catch((error) => {
        var errorMessage = error.message;
        return errorMessage
    
      });
      }

      
  //form- email or password logIn logOut 
    export const createUserWithEmailAndPasswords = (name, email, password) => {
       const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        const newUserInfo = res.user
        newUserInfo.error = "";
        newUserInfo.success = true;
      //  setUser(newUserInfo);
       updateUserInfo(name)
       return newUserInfo
      })
      .catch((error) => {
       const newUserInfo = {}
       newUserInfo.error = error.message
       newUserInfo.success = false;
       return newUserInfo
       //setUser(newUserInfo)
      });
    }

    export const signInWithEmailAndPasswords = (email, password) => {
        const auth = getAuth();
   return signInWithEmailAndPassword(auth, email, password)
    .then(res => {
      const newUserInfo = res.user
      newUserInfo.error = ""; 
      newUserInfo.success = true;
     return newUserInfo   
    })
    .catch((error) => {
      const newUserInfo = {}
      newUserInfo.error = error.message
      newUserInfo.success = false;
      return newUserInfo    
     });
    }


//update name
 export const updateUserInfo = name => {
    const auth = getAuth();
updateProfile(auth.currentUser, {
  displayName: name, 
})
.then(() => {
 console.log("user info updated successfully");
})
.catch((error) => {
 console.log(error);
});
}
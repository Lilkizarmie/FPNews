import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  clearUserData,
  setUserData,
  setUserTempData,
} from "../../utils/utils";
import store from "../store";
import types from "../types";

const { dispatch } = store;

GoogleSignin.configure({
  webClientId:
    '260056904490-uil0ul4nb8p8anoq53i32fnmbuu8bcoh.apps.googleusercontent.com',
  offlineAccess: true,
});

export const saveUserData = (data) => {
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};

export const addBookmark = newsItem => ({
  type: types.ADD_BOOKMARK,
  payload: newsItem,
});

export const removeBookmark = newsItemId => ({
  type: types.REMOVE_BOOKMARK,
  payload: newsItemId,
});

export function login({email, password}) {
   console.log(email, password);
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async userCredential => {
        const user = userCredential.user;
        console.log('User logged in:', user);

        // Generate the Firebase token
        try {
          const idToken = await user.getIdToken(); // Get the ID token
          console.log('ID Token:', idToken); // Log the ID token

          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            token: idToken, 
          };

          setUserData(userData)
          .then(() => {
            saveUserData(userData); // Save user data to Redux store
            resolve(userData); // Resolve the promise with user data
          })
          .catch(error => {
            reject(error); // Reject if there's an error in setUserData
          });
        } catch (error) {
          console.error('Failed to retrieve ID token:', error);
          reject(error);
        }
      })
      .catch(error => {
        console.error('Login failed:', error);
        reject(error); // Reject the promise on login error
      });
  });
}

export function signup({email, password}) {
  console.log(email, password);
  return new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async userCredential => {
        const user = userCredential.user;
        console.log('User created:', user);

        // Generate the Firebase token
        try {
          const idToken = await user.getIdToken(); // Get the ID token
          console.log('ID Token:', idToken); // Log the ID token

          const newUserData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            token: idToken, 
          };

          setUserTempData(newUserData)
            .then(() => {
              saveUserData(newUserData); // Save user data to Redux store
              resolve(newUserData);
            })
            .catch(error => {
              reject(error);
            });
        } catch (error) {
          console.error('Failed to retrieve ID token:', error);
          reject(error);
        }
      })
      .catch(error => {
        console.error('Signup failed:', error);
        reject(error);
      });
  });
}


export async function signInWithGoogle() {
  try {
    console.log('Checking if Google Play Services are available...');
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    await GoogleSignin.signOut().catch(error =>
      console.log('Error signing out:', error),
    );

    console.log('Starting Google Sign-In process...');
    const userInfo = await GoogleSignin.signIn();

    // Debug log to confirm idToken
    console.log('ID Token:', userInfo.data.idToken);

    // Create a Firebase credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.data.idToken,
    );

    // Sign in with Firebase using the Google credential
    console.log('Signing in with Firebase...');
    const userCredential = await auth().signInWithCredential(googleCredential);
    const user = userCredential.user;
    console.log('Firebase sign-in successful:', user);

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      token: userInfo.data.idToken,
    };

    // Save user data locally
    await setUserData(userData);
    dispatch({
      type: types.LOGIN,
      payload: userData,
    });

    console.log('User data saved successfully.');
    return userData;
  } catch (error) {
    console.error('Google Sign-In failed:', error);
    if (error.code) {
      console.error(`Error code: ${error.code}`);
    }
    throw error;
  }
}

export function logout() {
  return new Promise((resolve, reject) => {
    dispatch({ type: types.CLEAR_REDUX_STATE });
    clearUserData()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}


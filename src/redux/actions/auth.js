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

export function login(email, password) {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          // Include other user data as needed
        };

        setUserData(userData)
          .then(() => {
            saveUserData(userData);
            resolve(userData);
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        console.error('Login failed:', error);
        reject(error);
      });
  });
}

export function signup(email, password) {
  return new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        const tempUserData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          // Include other user data as needed
        };

        setUserTempData(tempUserData)
          .then(() => {
            resolve(tempUserData);
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        console.error('Signup failed:', error);
        reject(error);
      });
  });
}

export function signInWithGoogle() {
  return new Promise(async (resolve, reject) => {
    try {
      // Start Google Sign-In process
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {idToken} = userInfo;

      // Create a Firebase credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in with Firebase using the Google credential
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      const user = userCredential.user;

      console.log(user);

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        // Include other user data as needed
      };

      // Save user data locally
      await setUserData(userData);
      dispatch({
        type: types.LOGIN,
        payload: userData,
      });

      resolve(userData);
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      reject(error);
    }
  });
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


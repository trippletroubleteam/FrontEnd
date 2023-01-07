import { USER_STATE_CHANGE } from "../constants";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export const userAuthStateListener = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(getCurrentUserData);
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: false, loaded: true });
    }
  });
};

export const createUser = (userName, email, password) => {
  console.log(
    "in createCircleInvitation  circleId = " +
      userName +
      " for circleName " +
      email +
      " inviteeEmailId = " +
      password
  );
  new Promise(async (resolve, reject) => {
    firebase.firestore().collection("Users").add({
      UserName: userName,
      EmailAddress: email,
      password,
    });
  });
};

export const setLoaded = () => {
  new Promise(async (resolve, reject) => {
    dispatch({ type: USER_STATE_CHANGE, currentUser: true, loaded: true });
  });
};
export const login = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        console.log(e);
      });
  });

export const register = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });

export const getCurrentUserData = () => (dispatch) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot((res) => {
      if (res.exists) {
        return dispatch({
          type: USER_STATE_CHANGE,
          currentUser: res.data(),
          loaded: true,
        });
      }
    });
};
export const setParentOrChild = (type) => {
  console.log(
    "in update User name for name = " +
      type +
      " for user " +
      firebase.auth().currentUser.uid
  );
  new Promise(async (resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        displayName: type,
      })
      .catch((err) =>
        reject(console.log("srt found error during user name " + err))
      );
  });
  /* if (type == "child") {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        emailVerified: true,
      })
      .catch((err) =>
        reject(console.log("srt found error during user name " + err))
      );
  }
  */
};
export const getMyUid = () => {
  return firebase.auth().currentUser.uid + "PLEASEEEE";
};

export const getParent = () => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      return true;
    })

    .catch((err) =>
      reject(console.log("srt found error getting whether has parent " + err))
    );
};

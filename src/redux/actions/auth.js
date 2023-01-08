import { USER_STATE_CHANGE } from "../constants";
import { useDispatch } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export const userAuthStateListener = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("HIII");
      dispatch(getCurrentUserData());
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: false, loaded: true });
    }
  });
};
/*
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
*/
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
        console.log("We in the mainfram,e");
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
  if (type == "parent") {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        child: [],
      })
      .catch((err) =>
        reject(console.log("srt found error during user name " + err))
      );
  }
};
export const getMyUid = () => {
  return firebase.auth().currentUser.uid;
};

export const createChildArray = (existingChildren, childId, childName) => {
  console.log(existingChildren + "EXISITNG IS BEFORE");

  existingChildren.push({
    id: childId,
    name: childName,
    depressionPercent: "0",
    suggestion: "Your Child Has Not Taken a Survey Yet",
  });
  console.log(existingChildren + "EXISITNG IS AFTER");

  new Promise(async (resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        child: existingChildren,
      })
      .catch((err) =>
        reject(console.log("srt found error during user name " + err))
      );
  });
};
/*
export const getMyChildren = async () => {
  const userSnap = await firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get();
  console.log("WHAUISHJDIOAHJ " + JSON.stringify(userSnap.data().child));
  return userSnap.data().child; /*
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      return snapshot.data().child;
    })

    .catch((err) =>
      reject(console.log("srt found error getting whether has parent " + err))
    );
};
*/
export const withTiming = () => {
  console.log("srt in getUsersExpoToken function");
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((res) => {
        resolve([]);
      });
  });
};

export const getMyChildren = () =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        console.log(JSON.stringify(snapshot.data().child));
        resolve(snapshot.data().child);
      })
      .catch((e) => console.log(e));
  });

export const a = () => {
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

export const getParent = () =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        console.log(JSON.stringify(snapshot.data().emailVerified));
        resolve(snapshot.data().emailVerified);
      })
      .catch((e) => console.log(e));
  });

export const setHasParent = (userId) => {
  console.log("CHANGING PRENT FOR" + userId);
  new Promise(async (resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .update({
        emailVerified: true,
      })
      .catch((err) =>
        reject(console.log("srt found error during user name " + err))
      );
  });
};

export const getUsersExpoToken = () => {
  console.log("srt in getUsersExpoToken function");
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((res) => {
        console.log(
          "srt in getUsersExpoToken function. token is " +
            JSON.stringify(res.data().token)
        );
        return res.data().token;
      });
  });
};

export const updateUsersExpoToken = (token) => {
  console.log(
    "in set expo token = " +
      token +
      " for user " +
      firebase.auth().currentUser.uid
  );
  new Promise(async (resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        token: token,
      })
      .catch((err) =>
        reject(console.log("srt found error during user name " + err))
      );
  });
};

export const setDepressionAndSuggestion = (depressionPercent, suggestion) => {
  new Promise(async (resolve, reject) => {
    firebase
      .firestore()
      .collection("users")
      .where("child", "array-contains", firebase.auth().currentUser.uid)
      .update({
        depressionPercent,
        suggestion,
      })
      .catch((err) => console.log("srt found error during user name " + err));
  });
};

import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import store from "./store";
import { setUser, setUserRole, logout } from "./authSlice";

export const listenToAuthChanges = () => {
  onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
    if (user) {
      // User is signed in.
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      let role = "User"; // Default role
      if (userDoc.exists()) {
        role = userDoc.data().role || role;
      }
      
      store.dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }));
      store.dispatch(setUserRole(role));

    } else {
      // User is signed out.
      store.dispatch(logout());
    }
  });
};
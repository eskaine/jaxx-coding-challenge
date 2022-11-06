import React, { createContext } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../configs/firebase";

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const uploadImage = async (file) => {
    try {
      const auth = getAuth(firebaseConfig);
      await signInAnonymously(auth);

      const storage = getStorage();
      const storageRef = ref(storage, `/files/${file.name}`);

      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      return url;
    } catch (error) {
      console.error(error);
    }
  };

  const providerValues = {
    uploadImage,
  };

  return (
    <FirebaseContext.Provider value={providerValues}>
      {children}
    </FirebaseContext.Provider>
  );
};

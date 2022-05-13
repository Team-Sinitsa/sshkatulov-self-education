import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, setDoc, doc
} from 'firebase/firestore/lite';
import * as uuid from 'uuid';
import { firebaseConfig } from '../config';
import { User } from '../types/User';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchUsers = async () => {
  const usersCol = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCol);
  return usersSnapshot.docs.map((document) => document.data());
};

export const addNewUser = async (user: User) => {
  await setDoc(doc(db, 'users', uuid.v4()), user);
};

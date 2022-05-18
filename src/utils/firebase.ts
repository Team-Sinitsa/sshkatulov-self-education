import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, addDoc
} from 'firebase/firestore/lite';
import { firebaseConfig } from '../config';
import { User } from '../types';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchUsers = async () => {
  const usersCol = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCol);
  return usersSnapshot.docs.map((document) => document.data());
};

export const addNewUser = async (user: User) => {
  await addDoc(collection(db, 'users'), user);
};

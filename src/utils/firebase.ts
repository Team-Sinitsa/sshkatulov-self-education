import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, addDoc
} from 'firebase/firestore/lite';
import { firebaseConfig } from '../config';
import { User } from '../types';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const usersCollection = () => collection(db, 'users');

export const fetchUsers = async () => {
  const usersSnapshot = await getDocs(usersCollection());
  return usersSnapshot.docs.map((document) => document.data());
};

export const addNewUser = async (user: User) => {
  await addDoc(usersCollection(), user);
};

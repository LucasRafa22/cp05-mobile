import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import { auth, db } from '../config/firebase';

// Retorna a coleção de pets do usuário autenticado
const getPetsCollection = () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('Usuário não autenticado.');
  }

  return collection(db, 'usuarios', user.uid, 'pets');
};

// CREATE
export const criarPet = async (pet) => {
  const petsCollection = getPetsCollection();

  const docRef = await addDoc(petsCollection, {
    nome: pet.nome,
    especie: pet.especie,
    raca: pet.raca,
    idade: pet.idade,
  });

  return {
    id: docRef.id,
    ...pet,
  };
};

// READ
export const listarPets = async () => {
  const petsCollection = getPetsCollection();

  const snapshot = await getDocs(petsCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// UPDATE
export const atualizarPet = async (petId, dadosAtualizados) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('Usuário não autenticado.');
  }

  const petRef = doc(
    db,
    'usuarios',
    user.uid,
    'pets',
    petId
  );

  await updateDoc(petRef, {
    nome: dadosAtualizados.nome,
    especie: dadosAtualizados.especie,
    raca: dadosAtualizados.raca,
    idade: dadosAtualizados.idade,
  });

  return {
    id: petId,
    ...dadosAtualizados,
  };
};

// DELETE
export const excluirPet = async (petId) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('Usuário não autenticado.');
  }

  const petRef = doc(
    db,
    'usuarios',
    user.uid,
    'pets',
    petId
  );

  await deleteDoc(petRef);
};
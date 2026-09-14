import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
  updateProfile,
} from 'firebase/auth';

import { auth } from '../config/firebase';

/**
 * Converte os erros do Firebase em mensagens
 * mais amigáveis para o usuário.
 */
export function getAuthErrorMessage(error) {
  switch (error?.code) {
    case 'auth/email-already-in-use':
      return 'Este e-mail já está cadastrado.';

    case 'auth/invalid-email':
      return 'Digite um e-mail válido.';

    case 'auth/weak-password':
      return 'A senha deve ter pelo menos 6 caracteres.';

    case 'auth/user-not-found':
      return 'Usuário não encontrado.';

    case 'auth/wrong-password':
      return 'E-mail ou senha inválidos.';

    case 'auth/invalid-credential':
      return 'E-mail ou senha inválidos.';

    case 'auth/user-disabled':
      return 'Esta conta foi desativada.';

    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente novamente mais tarde.';

    case 'auth/network-request-failed':
      return 'Erro de conexão. Verifique sua internet.';

    case 'auth/requires-recent-login':
      return 'Por segurança, faça login novamente antes de excluir a conta.';

    default:
      return 'Ocorreu um erro. Tente novamente.';
  }
}

/**
 * Cadastro de usuário no Firebase Authentication.
 */
export async function registerUser(nome, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: nome,
    });

    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error) {
    return {
      success: false,
      message: getAuthErrorMessage(error),
      error,
    };
  }
}

/**
 * Login do usuário no Firebase Authentication.
 */
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error) {
    return {
      success: false,
      message: getAuthErrorMessage(error),
      error,
    };
  }
}

/**
 * Logout do usuário.
 */
export async function logoutUser() {
  try {
    await signOut(auth);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: getAuthErrorMessage(error),
      error,
    };
  }
}

/**
 * Envia e-mail para recuperação de senha.
 */
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: getAuthErrorMessage(error),
      error,
    };
  }
}

/**
 * Exclui a conta atualmente autenticada.
 */
export async function deleteAccount() {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return {
        success: false,
        message: 'Nenhum usuário está autenticado.',
      };
    }

    await deleteUser(currentUser);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: getAuthErrorMessage(error),
      error,
    };
  }
}
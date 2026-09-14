import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { auth } from '../config/firebase';
import {
  logoutUser,
  deleteAccount,
} from '../services/authService';

export default function PerfilScreen() {
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const user = auth.currentUser;

  const nome = user?.displayName || 'Usuário';
  const email = user?.email || 'E-mail não informado';

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: realizarLogout,
        },
      ]
    );
  };

  const realizarLogout = async () => {
    setLoadingLogout(true);

    const result = await logoutUser();

    setLoadingLogout(false);

    if (!result.success) {
      Alert.alert(
        'Erro ao sair',
        result.message
      );

      return;
    }

    // Não fazemos navigation.navigate('Login').
    // O AppNavigation detecta que o usuário saiu
    // e troca automaticamente para o AuthStack.
  };

  // =========================
  // EXCLUIR CONTA
  // =========================

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir conta',
      'Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: realizarExclusao,
        },
      ]
    );
  };

  const realizarExclusao = async () => {
    setLoadingDelete(true);

    const result = await deleteAccount();

    setLoadingDelete(false);

    if (!result.success) {
      Alert.alert(
        'Não foi possível excluir a conta',
        result.message
      );

      return;
    }

    Alert.alert(
      'Conta excluída',
      'Sua conta foi excluída com sucesso.',
      [
        {
          text: 'OK',
        },
      ]
    );

    // Não usamos navigation.navigate('Login').
    // Após deleteUser(), o Firebase altera o estado
    // de autenticação e o AppNavigation volta
    // automaticamente para o Login.
  };

  return (
    <View style={styles.container}>
      {/* PERFIL */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {nome.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.title}>
          Minha Conta
        </Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>
            Nome
          </Text>

          <Text style={styles.value}>
            {nome}
          </Text>

          <Text style={styles.label}>
            E-mail
          </Text>

          <Text style={styles.value}>
            {email}
          </Text>
        </View>
      </View>

      {/* BOTÕES */}
      <View style={styles.buttonsContainer}>
        {/* LOGOUT */}
        <TouchableOpacity
          style={[
            styles.logoutButton,
            (loadingLogout || loadingDelete) &&
              styles.buttonDisabled,
          ]}
          onPress={handleLogout}
          disabled={loadingLogout || loadingDelete}
        >
          {loadingLogout ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.logoutButtonText}>
              Sair da conta
            </Text>
          )}
        </TouchableOpacity>

        {/* EXCLUIR CONTA */}
        <TouchableOpacity
          style={[
            styles.deleteButton,
            (loadingLogout || loadingDelete) &&
              styles.buttonDisabled,
          ]}
          onPress={handleDeleteAccount}
          disabled={loadingLogout || loadingDelete}
        >
          {loadingDelete ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.deleteButtonText}>
              Excluir conta
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',

    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 15,
  },

  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  infoContainer: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },

  value: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 20,
  },

  buttonsContainer: {
    marginTop: 25,
  },

  logoutButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,

    paddingVertical: 15,
    paddingHorizontal: 30,

    alignItems: 'center',

    marginBottom: 15,
  },

  logoutButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  deleteButton: {
    backgroundColor: '#fff',

    borderWidth: 1,
    borderColor: '#d32f2f',

    borderRadius: 10,

    paddingVertical: 15,
    paddingHorizontal: 30,

    alignItems: 'center',
  },

  deleteButtonText: {
    color: '#d32f2f',
    fontSize: 17,
    fontWeight: 'bold',
  },

  buttonDisabled: {
    opacity: 0.6,
  },
});
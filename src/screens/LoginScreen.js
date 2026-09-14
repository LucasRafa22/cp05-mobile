import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { loginUser } from '../services/authService';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const emailTratado = email.trim();

    if (!emailTratado) {
      Alert.alert(
        'Atenção',
        'Digite seu e-mail.'
      );
      return;
    }

    if (!senha) {
      Alert.alert(
        'Atenção',
        'Digite sua senha.'
      );
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(emailTratado)) {
      Alert.alert(
        'E-mail inválido',
        'Digite um e-mail válido.'
      );
      return;
    }

    setLoading(true);

    const result = await loginUser(
      emailTratado,
      senha
    );

    setLoading(false);

    if (!result.success) {
      Alert.alert(
        'Erro no login',
        result.message
      );
      return;
    }

    /*
      NÃO usamos navigation.replace('Home') aqui.

      O Firebase altera o estado de autenticação.
      O onAuthStateChanged no App.js detecta o usuário
      e o StackRoutes automaticamente passa a mostrar
      as telas autenticadas.
    */
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          Pet Care
        </Text>

        <Text style={styles.subtitle}>
          Entre na sua conta
        </Text>

        <Text style={styles.label}>
          E-mail
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        <Text style={styles.label}>
          Senha
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity
          style={[
            styles.button,
            loading && styles.buttonDisabled,
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() =>
            navigation.navigate('EsqueciSenha')
          }
          disabled={loading}
        >
          <Text style={styles.linkText}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() =>
            navigation.navigate('Cadastro')
          }
          disabled={loading}
        >
          <Text style={styles.linkText}>
            Ainda não tenho uma conta
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
    marginBottom: 35,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 5,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  linkButton: {
    alignItems: 'center',
    marginTop: 20,
  },

  linkText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
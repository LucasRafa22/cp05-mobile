import { useState } from 'react';
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

import {
  loginUser,
} from '../services/authService';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  async function handleLogin() {
    const emailTratado = email.trim().toLowerCase();

    if (!emailTratado) {
      Alert.alert('Atenção', 'Informe seu e-mail.');
      return;
    }

    if (!validarEmail(emailTratado)) {
      Alert.alert('Atenção', 'Digite um e-mail válido.');
      return;
    }

    if (!senha) {
      Alert.alert('Atenção', 'Informe sua senha.');
      return;
    }

    try {
      setLoading(true);

      const resultado = await loginUser(
        emailTratado,
        senha
      );

      if (!resultado.success) {
        Alert.alert('Erro no login', resultado.message);
        return;
      }

      /*
       * Por enquanto vamos apenas navegar para Home.
       * A proteção real das rotas será implementada
       * na FASE 5.
       */
      navigation.replace('Home');
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível realizar o login.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Pet Care</Text>

          <Text style={styles.subtitle}>
            Entre na sua conta
          </Text>

          <Text style={styles.label}>E-mail</Text>

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

          <Text style={styles.label}>Senha</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EsqueciSenha')
            }
            disabled={loading}
          >
            <Text style={styles.forgotPassword}>
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

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
            onPress={() => navigation.navigate('Cadastro')}
            disabled={loading}
          >
            <Text style={styles.registerText}>
              Não possui uma conta? Criar conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },

  forgotPassword: {
    textAlign: 'right',
    color: '#2563eb',
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
  },

  button: {
    height: 50,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  registerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '600',
  },
});
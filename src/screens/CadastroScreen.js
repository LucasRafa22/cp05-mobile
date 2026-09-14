import { useState } from 'react';

import {
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

import { registerUser } from '../services/authService';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    const nomeTratado = nome.trim();
    const emailTratado = email.trim();

    // Verificar nome
    if (!nomeTratado) {
      Alert.alert(
        'Atenção',
        'Digite seu nome.'
      );
      return;
    }

    // Verificar e-mail
    if (!emailTratado) {
      Alert.alert(
        'Atenção',
        'Digite seu e-mail.'
      );
      return;
    }

    // Validar formato do e-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(emailTratado)) {
      Alert.alert(
        'E-mail inválido',
        'Digite um e-mail válido.'
      );
      return;
    }

    // Verificar senha
    if (!senha) {
      Alert.alert(
        'Atenção',
        'Digite uma senha.'
      );
      return;
    }

    // Firebase exige no mínimo 6 caracteres
    if (senha.length < 6) {
      Alert.alert(
        'Senha inválida',
        'A senha deve ter pelo menos 6 caracteres.'
      );
      return;
    }

    // Verificar confirmação da senha
    if (!confirmarSenha) {
      Alert.alert(
        'Atenção',
        'Confirme sua senha.'
      );
      return;
    }

    // Comparar senhas
    if (senha !== confirmarSenha) {
      Alert.alert(
        'Senhas diferentes',
        'A senha e a confirmação precisam ser iguais.'
      );
      return;
    }

    setLoading(true);

    const result = await registerUser(
      nomeTratado,
      emailTratado,
      senha
    );

    setLoading(false);

    // Cadastro com erro
    if (!result.success) {
      Alert.alert(
        'Erro no cadastro',
        result.message
      );
      return;
    }

    /*
      IMPORTANTE:

      Não usamos:

      navigation.navigate('Login');

      Depois do cadastro, o Firebase Authentication
      autentica o usuário automaticamente.

      O AppNavigation.js detecta a alteração através
      do onAuthStateChanged() e troca automaticamente
      o AuthStack pelo UserStack.

      Fluxo:

      Cadastro
          ↓
      Firebase Authentication
          ↓
      usuário autenticado
          ↓
      AppNavigation
          ↓
      UserStack
          ↓
      Home
    */

    Alert.alert(
      'Cadastro realizado!',
      'Sua conta foi criada com sucesso.',
      [
        {
          text: 'OK',
        },
      ]
    );
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
          Criar conta
        </Text>

        <Text style={styles.subtitle}>
          Cadastre-se no Pet Care
        </Text>

        {/* NOME */}

        <Text style={styles.label}>
          Nome
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
          editable={!loading}
        />

        {/* E-MAIL */}

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

        {/* SENHA */}

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

        {/* CONFIRMAR SENHA */}

        <Text style={styles.label}>
          Confirmar senha
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
          editable={!loading}
        />

        {/* BOTÃO CADASTRO */}

        <TouchableOpacity
          style={[
            styles.button,
            loading && styles.buttonDisabled,
          ]}
          onPress={handleCadastro}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Criar conta
            </Text>
          )}
        </TouchableOpacity>

        {/* VOLTAR PARA LOGIN */}

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() =>
            navigation.navigate('Login')
          }
          disabled={loading}
        >
          <Text style={styles.linkText}>
            Já tenho uma conta
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
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
    marginBottom: 18,
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
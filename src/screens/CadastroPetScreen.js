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

import { criarPet } from '../services/firestoreService';

export default function CadastroPetScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');

  const [loading, setLoading] = useState(false);

  const handleCadastrar = async () => {
    // =========================
    // VALIDAÇÕES
    // =========================

    const nomeTratado = nome.trim();
    const especieTratada = especie.trim();
    const racaTratada = raca.trim();
    const idadeTratada = idade.trim();

    if (!nomeTratado) {
      Alert.alert(
        'Atenção',
        'Digite o nome do pet.'
      );
      return;
    }

    if (!especieTratada) {
      Alert.alert(
        'Atenção',
        'Digite a espécie do pet.'
      );
      return;
    }

    if (!racaTratada) {
      Alert.alert(
        'Atenção',
        'Digite a raça do pet.'
      );
      return;
    }

    if (!idadeTratada) {
      Alert.alert(
        'Atenção',
        'Digite a idade do pet.'
      );
      return;
    }

    const idadeNumero = Number(idadeTratada);

    if (Number.isNaN(idadeNumero)) {
      Alert.alert(
        'Idade inválida',
        'Digite uma idade válida.'
      );
      return;
    }

    if (idadeNumero < 0) {
      Alert.alert(
        'Idade inválida',
        'A idade não pode ser negativa.'
      );
      return;
    }

    setLoading(true);

    try {
      // =========================
      // CREATE NO FIRESTORE
      // =========================

      await criarPet({
        nome: nomeTratado,
        especie: especieTratada,
        raca: racaTratada,
        idade: idadeNumero,
      });

      Alert.alert(
        'Sucesso!',
        'Pet cadastrado com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );

      // Limpa os campos
      setNome('');
      setEspecie('');
      setRaca('');
      setIdade('');
    } catch (error) {
      console.error(
        'Erro ao cadastrar pet:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível cadastrar o pet. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
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
          Cadastrar Pet
        </Text>

        <Text style={styles.description}>
          Preencha os dados do seu pet.
        </Text>

        {/* NOME */}

        <Text style={styles.label}>
          Nome
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o nome do pet"
          value={nome}
          onChangeText={setNome}
          editable={!loading}
          autoCapitalize="words"
        />

        {/* ESPÉCIE */}

        <Text style={styles.label}>
          Espécie
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex.: Cachorro"
          value={especie}
          onChangeText={setEspecie}
          editable={!loading}
          autoCapitalize="words"
        />

        {/* RAÇA */}

        <Text style={styles.label}>
          Raça
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex.: Golden Retriever"
          value={raca}
          onChangeText={setRaca}
          editable={!loading}
          autoCapitalize="words"
        />

        {/* IDADE */}

        <Text style={styles.label}>
          Idade
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite a idade"
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
          editable={!loading}
        />

        {/* BOTÃO */}

        <TouchableOpacity
          style={[
            styles.button,
            loading && styles.buttonDisabled,
          ]}
          onPress={handleCadastrar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Cadastrar Pet
            </Text>
          )}
        </TouchableOpacity>

        {/* VOLTAR */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.backButtonText}>
            Voltar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingVertical: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
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

  backButton: {
    alignItems: 'center',
    marginTop: 20,
  },

  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
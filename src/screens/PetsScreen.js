import { useCallback, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import {
  listarPets,
  excluirPet,
} from '../services/firestoreService';

export default function PetsScreen({ navigation }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const carregarPets = async () => {
    try {
      setLoading(true);

      const dados = await listarPets();

      setPets(dados);
    } catch (error) {
      console.error(
        'Erro ao listar pets:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível carregar os pets.'
      );
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarPets();
    }, [])
  );

  const handleExcluirPet = (pet) => {
    Alert.alert(
      'Excluir pet',
      `Tem certeza que deseja excluir ${pet.nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeletingId(pet.id);

              await excluirPet(pet.id);

              // Remove o pet da lista imediatamente
              setPets((petsAtuais) =>
                petsAtuais.filter(
                  (item) => item.id !== pet.id
                )
              );

              Alert.alert(
                'Sucesso!',
                'Pet excluído com sucesso.'
              );
            } catch (error) {
              console.error(
                'Erro ao excluir pet:',
                error
              );

              Alert.alert(
                'Erro',
                'Não foi possível excluir o pet. Tente novamente.'
              );
            } finally {
              setDeletingId(null);
            }
          },
        },
      ]
    );
  };

  const renderPet = ({ item }) => {
    const isDeleting = deletingId === item.id;

    return (
      <View style={styles.petCard}>
        <Text style={styles.petName}>
          {item.nome}
        </Text>

        <Text style={styles.petInfo}>
          Espécie: {item.especie}
        </Text>

        <Text style={styles.petInfo}>
          Raça: {item.raca}
        </Text>

        <Text style={styles.petInfo}>
          Idade: {item.idade} anos
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[
              styles.editButton,
              isDeleting && styles.disabledButton,
            ]}
            onPress={() =>
              navigation.navigate(
                'EditarPet',
                {
                  pet: item,
                }
              )
            }
            disabled={isDeleting}
          >
            <Text style={styles.actionText}>
              Editar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.deleteButton,
              isDeleting && styles.disabledButton,
            ]}
            onPress={() => handleExcluirPet(item)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.actionText}>
                Excluir
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#007AFF"
        />

        <Text style={styles.loadingText}>
          Carregando pets...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('CadastroPet')
        }
      >
        <Text style={styles.addButtonText}>
          + Cadastrar Pet
        </Text>
      </TouchableOpacity>

      {pets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            Nenhum pet cadastrado
          </Text>

          <Text style={styles.emptyText}>
            Cadastre seu primeiro pet para
            começar.
          </Text>
        </View>
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          renderItem={renderPet}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={carregarPets}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },

  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },

  addButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  list: {
    paddingBottom: 20,
  },

  petCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3,
  },

  petName: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  petInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },

  actions: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },

  editButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#DC3545',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.6,
  },

  actionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
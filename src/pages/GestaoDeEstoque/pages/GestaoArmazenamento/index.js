import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const GestaoArmazenamento = () => {
  const [local, setLocal] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [armazenamento, setArmazenamento] = useState([]);

  // Função para adicionar um novo local de armazenamento
  const adicionarArmazenamento = () => {
    const novoArmazenamento = {
      local,
      capacidade,
    };
    setArmazenamento([...armazenamento, novoArmazenamento]);
    setLocal('');  // Limpa o campo de local após adicionar
    setCapacidade('');  // Limpa o campo de capacidade após adicionar
  };

  // Renderizar cada item de local de armazenamento salvo
  const renderArmazenamento = ({ item }) => (
    <View style={styles.armazenamentoItem}>
      <Text style={styles.armazenamentoText}>Local: {item.local}</Text>
      <Text style={styles.armazenamentoText}>Capacidade: {item.capacidade}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Local de Armazenamento</Text>
      <TextInput
        style={styles.input}
        value={local}
        onChangeText={setLocal}
        placeholder="Digite o local de armazenamento"
      />

      <Text style={styles.label}>Capacidade (em kg)</Text>
      <TextInput
        style={styles.input}
        value={capacidade}
        onChangeText={setCapacidade}
        placeholder="Digite a capacidade de armazenamento"
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={adicionarArmazenamento} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Armazenamento</Text>
      </TouchableOpacity>

      <FlatList
        data={armazenamento}
        renderItem={renderArmazenamento}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum local de armazenamento registrado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  armazenamentoItem: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  armazenamentoText: {
    fontSize: 14,
  },
  emptyListText: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default GestaoArmazenamento;

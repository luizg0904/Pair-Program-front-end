import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const MovimentacaoEstoque = () => {
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [movimentacoes, setMovimentacoes] = useState([]);

  const adicionarMovimentacao = () => {
    const novaMovimentacao = {
      produto,
      quantidade,
      data: new Date().toLocaleDateString(),
    };
    setMovimentacoes([...movimentacoes, novaMovimentacao]);
    setProduto('');
    setQuantidade('');
  };

  const renderMovimentacao = ({ item }) => (
    <View style={styles.movimentacaoItem}>
      <Text style={styles.movimentacaoText}>Produto: {item.produto}</Text>
      <Text style={styles.movimentacaoText}>Quantidade: {item.quantidade}</Text>
      <Text style={styles.movimentacaoText}>Data: {item.data}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Produto Movimentado</Text>
      <TextInput
        style={styles.input}
        value={produto}
        onChangeText={setProduto}
        placeholder="Digite o nome do produto"
      />

      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder="Digite a quantidade"
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={adicionarMovimentacao} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Movimentação</Text>
      </TouchableOpacity>

      <FlatList
        data={movimentacoes}
        renderItem={renderMovimentacao}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyListText}>Nenhuma movimentação registrada.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  movimentacaoItem: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    marginBottom: 8,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  movimentacaoText: {
    fontSize: 14,
  },
  emptyListText: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default MovimentacaoEstoque;

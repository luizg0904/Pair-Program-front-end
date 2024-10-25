import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const EstoqueProdutosAgricolas = () => {
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [estoque, setEstoque] = useState([]);

  const adicionarProduto = () => {
    const novoProduto = {
      produto,
      quantidade,
    };
    setEstoque([...estoque, novoProduto]);
    setProduto('');
    setQuantidade('');
  };

  const renderProduto = ({ item }) => (
    <View style={styles.produtoItem}>
      <Text style={styles.produtoText}>Produto: {item.produto}</Text>
      <Text style={styles.produtoText}>Quantidade: {item.quantidade}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Produto Agrícola</Text>
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

      <TouchableOpacity onPress={adicionarProduto} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Produto</Text>
      </TouchableOpacity>

      <FlatList
        data={estoque}
        renderItem={renderProduto}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum produto no estoque.</Text>}
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
  produtoItem: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    marginBottom: 8,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  produtoText: {
    fontSize: 14,
  },
  emptyListText: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default EstoqueProdutosAgricolas;

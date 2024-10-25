import React, { useState } from 'react';  
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const EstoqueDeProdutos = () => {
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(new Date());
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos salvos

  // Lista de produtos para o seletor
  const produtosList = [
    { label: 'Produto 1', value: '1' },
    { label: 'Produto 2', value: '2' },
    { label: 'Produto 3', value: '3' },
  ];

  // Função para salvar os dados do estoque
  const salvarProduto = () => {
    const novoProduto = {
      id_produto: produto,
      quantidade_disponivel: quantidade,
      ultima_atualizacao: new Date().toISOString(), // Salva a data e hora atuais
    };
    setProdutos([...produtos, novoProduto]);  // Adiciona o novo produto ao estado
    setProduto('');  // Limpar campos após salvar
    setQuantidade('');
    setUltimaAtualizacao(new Date());
  };

  // Função para formatar a data e hora
  const formatDateTime = (date) => {
    return date ? new Date(date).toLocaleString('pt-BR') : 'Não especificado';
  };

  // Função para excluir produto
  const excluirProduto = (index) => {
    const novosProdutos = [...produtos];
    novosProdutos.splice(index, 1);  // Remove o produto pelo índice
    setProdutos(novosProdutos);  // Atualiza o estado
  };

  // Renderizar cada item de produto salvo
  const renderProduto = ({ item, index }) => (
    <View style={styles.produtoItem}>
      <Text style={styles.produtoText}>ID Produto: {item.id_produto}</Text>
      <Text style={styles.produtoText}>Quantidade Disponível: {item.quantidade_disponivel}</Text>
      <Text style={styles.produtoText}>Última Atualização: {formatDateTime(item.ultima_atualizacao)}</Text>
      
      {/* Botão para Excluir Produto */}
      <TouchableOpacity onPress={() => excluirProduto(index)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Excluir Produto</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Produto:</Text>
      {/* Seletor para produto */}
      <RNPickerSelect
        onValueChange={(value) => setProduto(value)}
        items={produtosList}
        style={pickerSelectStyles}
        placeholder={{ label: "Selecione o produto", value: null }}
      />

      <Text style={styles.label}>Quantidade Disponível:</Text>
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder="Digite a quantidade disponível"
        keyboardType="numeric"
      />

      {/* Não precisa mostrar o campo de última atualização, ele será gerado automaticamente */}

      <TouchableOpacity onPress={salvarProduto} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar Produto</Text>
      </TouchableOpacity>

      {/* Seção de Produtos Salvos */}
      <Text style={styles.sectionTitle}>Produtos Salvos:</Text>
      <FlatList
        data={produtos}
        renderItem={renderProduto}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum produto salvo.</Text>}
      />
    </View>
  );
};

// Estilos para o seletor
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // Para garantir que o texto não fique atrás do ícone
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
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
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  produtoItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  produtoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyListText: {
    fontStyle: 'italic',
    color: '#888',
  },
});

export default EstoqueDeProdutos;

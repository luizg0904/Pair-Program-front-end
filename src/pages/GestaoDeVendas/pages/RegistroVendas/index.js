import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegistroDeVendas = () => {
  const [cliente, setCliente] = useState('');
  const [dataPedido, setDataPedido] = useState(new Date());
  const [status, setStatus] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [showDataPicker, setShowDataPicker] = useState(false);
  const [pedidos, setPedidos] = useState([]); // Estado para armazenar pedidos salvos

  // Função para salvar pedido
  const salvarPedido = () => {
    const novoPedido = {
      id: pedidos.length + 1,
      id_cliente: cliente,
      data_pedido: dataPedido,
      status,
      valor_total: valorTotal,
    };
    setPedidos([...pedidos, novoPedido]);  // Adiciona o novo pedido ao estado
    limparCampos();
  };

  // Função para limpar os campos após salvar
  const limparCampos = () => {
    setCliente('');
    setStatus('');
    setValorTotal('');
    setDataPedido(new Date());
  };

  // Função para formatar a data em português
  const formatDate = (date) => {
    return date ? date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) : 'Não especificado';
  };

  // Função para excluir pedido
  const excluirPedido = (index) => {
    const novosPedidos = [...pedidos];
    novosPedidos.splice(index, 1);  // Remove o pedido pelo índice
    setPedidos(novosPedidos);  // Atualiza o estado
  };

  // Renderizar item da lista de pedidos salvos
  const renderPedido = ({ item, index }) => (
    <View style={styles.pedidoItem}>
      <Text style={styles.pedidoText}>Cliente: {item.id_cliente}</Text>
      <Text style={styles.pedidoText}>Data do Pedido: {formatDate(item.data_pedido)}</Text>
      <Text style={styles.pedidoText}>Status: {item.status}</Text>
      <Text style={styles.pedidoText}>Valor Total: R$ {item.valor_total}</Text>
      
      {/* Botão para Excluir Pedido */}
      <TouchableOpacity onPress={() => excluirPedido(index)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Excluir Pedido</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Cliente"
        value={cliente}
        onChangeText={setCliente}
      />
      <TouchableOpacity onPress={() => setShowDataPicker(true)} style={styles.dateButton}>
        <Text>{dataPedido ? formatDate(dataPedido) : 'Selecionar data'}</Text>
      </TouchableOpacity>
      {showDataPicker && (
        <DateTimePicker
          value={dataPedido}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDataPicker(false);
            setDataPedido(selectedDate || dataPedido);
          }}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor Total"
        value={valorTotal}
        onChangeText={setValorTotal}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.saveButton} onPress={salvarPedido}>
        <Text style={styles.saveButtonText}>Salvar Pedido</Text>
      </TouchableOpacity>

      {/* Seção de Pedidos Salvos */}
      <Text style={styles.sectionTitle}>Pedidos Salvos:</Text>
      <FlatList
        data={pedidos}
        renderItem={renderPedido}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum pedido salvo.</Text>}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 5,
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
    borderRadius: 5,
    alignItems: 'center',
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
  pedidoItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  pedidoText: {
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
    textAlign: 'center',
  },
});

export default RegistroDeVendas;

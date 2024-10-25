import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const Irrigacao = () => {
  const [idCultivo, setIdCultivo] = useState('');
  const [quantidadeAgua, setQuantidadeAgua] = useState('');
  const [dataIrrigacao, setDataIrrigacao] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [irrigacoes, setIrrigacoes] = useState([]); // Estado para armazenar irrigações salvas

  // Lista de exemplos de IDs de cultivo (você deve substituir pelos reais)
  const cultivos = [
    { id: '1', nome: 'Cultivo 1' },
    { id: '2', nome: 'Cultivo 2' },
    { id: '3', nome: 'Cultivo 3' },
  ];

  // Lista de opções de quantidade de água
  const opcoesAgua = [1, 2, 3, 4, 5]; // Litros

  // Função para salvar os dados de irrigação
  const salvarIrrigacao = () => {
    const novaIrrigacao = {
      id_cultivo: idCultivo,
      quantidade_agua: quantidadeAgua,
      data: dataIrrigacao,
    };
    setIrrigacoes([...irrigacoes, novaIrrigacao]); // Adiciona a nova irrigação ao estado
    setIdCultivo('');
    setQuantidadeAgua('');
    setDataIrrigacao(new Date());
  };

  // Função para formatar a data
  const formatDate = (date) => {
    return date ? date.toLocaleDateString('pt-BR') : 'Não especificado';
  };

  // Função para excluir uma irrigação
  const excluirIrrigacao = (index) => {
    const novasIrrigacoes = [...irrigacoes];
    novasIrrigacoes.splice(index, 1); // Remove a irrigação pelo índice
    setIrrigacoes(novasIrrigacoes); // Atualiza o estado
  };

  // Renderizar cada item de irrigação salvo
  const renderIrrigacao = ({ item, index }) => (
    <View style={styles.irrigacaoItem}>
      <Text style={styles.irrigacaoText}>ID Cultivo: {item.id_cultivo}</Text>
      <Text style={styles.irrigacaoText}>Quantidade de Água: {item.quantidade_agua} L</Text>
      <Text style={styles.irrigacaoText}>Data: {formatDate(item.data)}</Text>
      {/* Botão para Excluir Irrigação */}
      <TouchableOpacity onPress={() => excluirIrrigacao(index)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Excluir Irrigação</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={idCultivo}
        onValueChange={(itemValue) => setIdCultivo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um cultivo" value="" />
        {cultivos.map((cultivo) => (
          <Picker.Item key={cultivo.id} label={cultivo.nome} value={cultivo.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Quantidade de Água (L):</Text>
      <Picker
        selectedValue={quantidadeAgua}
        onValueChange={(itemValue) => setQuantidadeAgua(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione a quantidade" value="" />
        {opcoesAgua.map((opcao) => (
          <Picker.Item key={opcao} label={`${opcao} L`} value={opcao} />
        ))}
      </Picker>

      <Text style={styles.label}>Data da Irrigação:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text>{dataIrrigacao ? formatDate(dataIrrigacao) : 'Selecionar data'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dataIrrigacao}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            setDataIrrigacao(selectedDate || dataIrrigacao);
          }}
        />
      )}

      <TouchableOpacity onPress={salvarIrrigacao} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar Irrigação</Text>
      </TouchableOpacity>

      {/* Seção de Irrigações Salvas */}
      <Text style={styles.sectionTitle}>Irrigações Salvas:</Text>
      <FlatList
        data={irrigacoes}
        renderItem={renderIrrigacao}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyListText}>Nenhuma irrigação salva.</Text>}
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
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
  irrigacaoItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  irrigacaoText: {
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

export default Irrigacao;

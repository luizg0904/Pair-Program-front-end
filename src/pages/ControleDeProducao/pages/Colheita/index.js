import React, { useState } from 'react';  
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Importando o Picker
import DateTimePicker from '@react-native-community/datetimepicker';

const Colheita = () => {
  const [tipoCultivo, setTipoCultivo] = useState('');
  const [idProduto, setIdProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [dataColheita, setDataColheita] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [colheitas, setColheitas] = useState([]); // Estado para armazenar colheitas salvas

  // Função para salvar os dados da colheita
  const salvarColheita = () => {
    const novaColheita = {
      tipo_cultivo: tipoCultivo,
      id_produto: idProduto,
      quantidade: quantidade,
      data: dataColheita,
    };
    setColheitas([...colheitas, novaColheita]);  // Adiciona a nova colheita ao estado
    setTipoCultivo('');  // Limpar os campos após salvar
    setIdProduto('');
    setQuantidade('');
    setDataColheita(new Date());
  };

  // Função para formatar a data em português
  const formatDate = (date) => {
    return date ? date.toLocaleDateString('pt-BR') : 'Não especificado';
  };

  // Função para excluir uma colheita
  const excluirColheita = (index) => {
    const novasColheitas = [...colheitas];
    novasColheitas.splice(index, 1);  // Remove a colheita pelo índice
    setColheitas(novasColheitas);  // Atualiza o estado
  };

  // Renderizar cada item de colheita salvo
  const renderColheita = ({ item, index }) => (
    <View style={styles.colheitaItem}>
      <Text style={styles.colheitaText}>Tipo de Cultivo: {item.tipo_cultivo}</Text>
      <Text style={styles.colheitaText}>Produto: {item.id_produto}</Text>
      <Text style={styles.colheitaText}>Quantidade: {item.quantidade}</Text>
      <Text style={styles.colheitaText}>Data: {formatDate(item.data)}</Text>
      
      {/* Botão para Excluir Colheita */}
      <TouchableOpacity onPress={() => excluirColheita(index)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Excluir Colheita</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Cultivo:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoCultivo}
          onValueChange={(itemValue) => setTipoCultivo(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o Tipo de Cultivo" value="" />
          <Picker.Item label="Hortaliças" value="hortalicas" />
          <Picker.Item label="Frutas" value="frutas" />
          <Picker.Item label="Grãos" value="graos" />
          {/* Adicione outros tipos de cultivo conforme necessário */}
        </Picker>
      </View>

      <Text style={styles.label}>Produto:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={idProduto}
          onValueChange={(itemValue) => setIdProduto(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o Produto" value="" />
          <Picker.Item label="Alface" value="alface" />
          <Picker.Item label="Tomate" value="tomate" />
          <Picker.Item label="Milho" value="milho" />
          {/* Adicione outros produtos conforme necessário */}
        </Picker>
      </View>

      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder="Digite a quantidade"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Data da Colheita:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text>{dataColheita ? formatDate(dataColheita) : 'Selecionar data'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dataColheita}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            setDataColheita(selectedDate || dataColheita);
          }}
        />
      )}

      <TouchableOpacity onPress={salvarColheita} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar Colheita</Text>
      </TouchableOpacity>

      {/* Seção de Colheitas Salvas */}
      <Text style={styles.sectionTitle}>Colheitas Salvas:</Text>
      <FlatList
        data={colheitas}
        renderItem={renderColheita}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyListText}>Nenhuma colheita salva.</Text>}
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
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
  colheitaItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  colheitaText: {
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

export default Colheita;

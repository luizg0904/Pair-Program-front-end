import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const Cultivo = ({ navigation }) => {
  const [insumo, setInsumo] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [dataInicio, setDataInicio] = useState(new Date());
  const [dataFim, setDataFim] = useState(null);
  const [showDataInicio, setShowDataInicio] = useState(false);
  const [showDataFim, setShowDataFim] = useState(false);
  const [cultivos, setCultivos] = useState([]);
  
  const insumosList = [
    { label: 'Insumo 1', value: '1' },
    { label: 'Insumo 2', value: '2' },
    { label: 'Insumo 3', value: '3' },
  ];

  // Função para buscar o horário atual usando a WorldTimeAPI
  const fetchCurrentDateTime = async () => {
    try {
      const response = await axios.get('http://worldtimeapi.org/api/timezone/America/Sao_Paulo');
      const dateTime = new Date(response.data.datetime);
      setDataInicio(dateTime);
    } catch (error) {
      console.error('Erro ao buscar a data e hora atual:', error);
      Alert.alert('Erro', 'Não foi possível buscar a data e hora atual.');
    }
  };

  const fetchCultivos = async () => {
    try {
      const response = await axios.get('http://192.168.15.3:5231/api/cultivo');
      setCultivos(response.data);
    } catch (error) {
      console.error('Erro ao buscar cultivos:', error);
    }
  };

  useEffect(() => {
    fetchCurrentDateTime();
    fetchCultivos();
  }, []);

  const salvarCultivo = async () => {
    if (!insumo || !quantidade) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const novoCultivo = {
      insumo,
      quantidade,
      data_inicio: dataInicio.toISOString(),
      data_fim: dataFim ? dataFim.toISOString() : null,
    };

    try {
      await axios.post('http://192.168.15.3:5231/api/cultivo', novoCultivo);
      setCultivos([...cultivos, novoCultivo]);
      setInsumo(null);
      setQuantidade('');
      fetchCurrentDateTime();
      setDataFim(null);
    } catch (error) {
      console.error('Erro ao salvar cultivo:', error);
      Alert.alert('Erro', 'Não foi possível salvar o cultivo.');
    }
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) : 'Não especificado';
  };

  const excluirCultivo = async (id) => {
    try {
      await axios.delete(`http://192.168.15.3:5231/api/cultivo/${id}`);
      setCultivos(cultivos.filter(cultivo => cultivo.id !== id));
    } catch (error) {
      console.error('Erro ao excluir cultivo:', error);
      Alert.alert('Erro', 'Não foi possível excluir o cultivo.');
    }
  };

  const renderCultivo = ({ item }) => (
    <View style={styles.cultivoItem}>
      <Text style={styles.cultivoText}>Insumo: {item.insumo}</Text>
      <Text style={styles.cultivoText}>Quantidade: {item.quantidade}</Text>
      <Text style={styles.cultivoText}>Data de Início: {item.data_inicio ? item.data_inicio.slice(0, 10) : 'Não especificado'}</Text>
      <Text style={styles.cultivoText}>Data de Fim: {item.data_fim ? item.data_fim.slice(0, 10) : 'Não especificado'}</Text>
      <TouchableOpacity onPress={() => excluirCultivo(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Excluir Cultivo</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Insumo:</Text>
      <RNPickerSelect
        onValueChange={(value) => setInsumo(value)}
        items={insumosList}
        style={pickerSelectStyles}
        placeholder={{ label: "Selecione o insumo", value: null }}
      />

      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder="Digite a quantidade"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Data de Início:</Text>
      <TouchableOpacity onPress={() => setShowDataInicio(true)} style={styles.dateButton}>
        <Text>{dataInicio ? formatDate(dataInicio) : 'Selecionar data'}</Text>
      </TouchableOpacity>
      {showDataInicio && (
        <DateTimePicker
          value={dataInicio}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDataInicio(false);
            if (selectedDate) {
              setDataInicio(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>Data de Fim (opcional):</Text>
      <TouchableOpacity onPress={() => setShowDataFim(true)} style={styles.dateButton}>
        <Text>{dataFim ? formatDate(dataFim) : 'Selecionar data'}</Text>
      </TouchableOpacity>
      {showDataFim && (
        <DateTimePicker
          value={dataFim || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDataFim(false);
            if (selectedDate) {
              setDataFim(selectedDate);
            }
          }}
        />
      )}

      <TouchableOpacity onPress={salvarCultivo} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar Cultivo</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Cultivos Salvos:</Text>
      <FlatList
        data={cultivos}
        renderItem={renderCultivo}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum cultivo salvo.</Text>}
      />
    </View>
  );
};

// Estilos
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
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
  cultivoItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  cultivoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
  },
  emptyListText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});

export default Cultivo;

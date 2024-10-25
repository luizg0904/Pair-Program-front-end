import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ControleTemperatura = () => {
  const [temperatura, setTemperatura] = useState('');
  const [dataMediacao, setDataMediacao] = useState(new Date());
  const [horaMediacao, setHoraMediacao] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [medicoes, setMedicoes] = useState([]); // Estado para armazenar as medições salvas

  // Função para salvar a medição de temperatura
  const salvarMedicao = () => {
    const novaMedicao = {
      temperatura: temperatura,
      data: dataMediacao,
      hora: horaMediacao,
    };
    setMedicoes([...medicoes, novaMedicao]);  // Adiciona a nova medição ao estado
    setTemperatura('');
    setDataMediacao(new Date());
    setHoraMediacao(new Date());
  };

  // Função para formatar a data e a hora
  const formatDate = (date) => {
    return date ? date.toLocaleDateString('pt-BR') : 'Não especificado';
  };

  const formatTime = (time) => {
    return time ? time.toLocaleTimeString('pt-BR') : 'Não especificado';
  };

  // Função para excluir uma medição
  const excluirMedicao = (index) => {
    const novasMedicoes = [...medicoes];
    novasMedicoes.splice(index, 1);  // Remove a medição pelo índice
    setMedicoes(novasMedicoes);  // Atualiza o estado
  };

  // Renderizar cada item de medição salva
  const renderMedicao = ({ item, index }) => (
    <View style={styles.medicaoItem}>
      <Text style={styles.medicaoText}>Temperatura: {item.temperatura} °C</Text>
      <Text style={styles.medicaoText}>Data: {formatDate(item.data)}</Text>
      <Text style={styles.medicaoText}>Hora: {formatTime(item.hora)}</Text>
      
      {/* Botão para Excluir Medição */}
      <TouchableOpacity onPress={() => excluirMedicao(index)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Excluir Medição</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Temperatura (°C):</Text>
      <TextInput
        style={styles.input}
        value={temperatura}
        onChangeText={setTemperatura}
        placeholder="Digite a temperatura"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Data da Medição:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text>{dataMediacao ? formatDate(dataMediacao) : 'Selecionar data'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dataMediacao}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            setDataMediacao(selectedDate || dataMediacao);
          }}
        />
      )}

      <Text style={styles.label}>Hora da Medição:</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateButton}>
        <Text>{horaMediacao ? formatTime(horaMediacao) : 'Selecionar hora'}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={horaMediacao}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            setHoraMediacao(selectedTime || horaMediacao);
          }}
        />
      )}

      <TouchableOpacity onPress={salvarMedicao} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar Medição</Text>
      </TouchableOpacity>

      {/* Seção de Medições Salvas */}
      <Text style={styles.sectionTitle}>Medições Salvas:</Text>
      <FlatList
        data={medicoes}
        renderItem={renderMedicao}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyListText}>Nenhuma medição salva.</Text>}
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
  medicaoItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  medicaoText: {
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

export default ControleTemperatura;

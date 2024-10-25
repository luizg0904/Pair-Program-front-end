import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const GestaoDeClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [genero, setGenero] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');

  // Função para salvar cliente
  const salvarCliente = () => {
    const novoCliente = {
      id: clientes.length + 1,
      nome,
      data_nascimento: dataNascimento,
      cpf,
      genero,
      telefone,
      email,
      endereco,
      created_at: new Date().toISOString(),
    };
    setClientes([...clientes, novoCliente]);
    limparCampos();
  };

  // Função para limpar os campos após salvar
  const limparCampos = () => {
    setNome('');
    setDataNascimento('');
    setCpf('');
    setGenero('');
    setTelefone('');
    setEmail('');
    setEndereco('');
  };

  // Renderizar item da lista de clientes
  const renderCliente = ({ item }) => (
    <View style={styles.clienteItem}>
      <Text style={styles.clienteText}>Nome: {item.nome}</Text>
      <Text style={styles.clienteText}>Data de Nascimento: {item.data_nascimento}</Text>
      <Text style={styles.clienteText}>CPF: {item.cpf}</Text>
      <Text style={styles.clienteText}>Gênero: {item.genero}</Text>
      <Text style={styles.clienteText}>Telefone: {item.telefone}</Text>
      <Text style={styles.clienteText}>Email: {item.email}</Text>
      <Text style={styles.clienteText}>Endereço: {item.endereco}</Text>
      <Text style={styles.clienteText}>Cadastrado em: {item.created_at}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
     

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Gênero"
        value={genero}
        onChangeText={setGenero}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />

      <TouchableOpacity style={styles.saveButton} onPress={salvarCliente}>
        <Text style={styles.saveButtonText}>Salvar Cliente</Text>
      </TouchableOpacity>

      {/* Lista de clientes salvos */}
      <FlatList
        data={clientes}
        renderItem={renderCliente}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum cliente salvo.</Text>}
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
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  clienteItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 5,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  clienteText: {
    fontSize: 14,
    marginBottom: 5,
  },
  emptyListText: {
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default GestaoDeClientes;

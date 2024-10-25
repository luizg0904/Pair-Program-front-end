import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

// Componente de Login
const Login = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  // Função para lidar com o processo de login
  const handleLogin = async () => {
    const username = usuario.trim();
    const password = senha.trim();
  
    if (!username || !password) {
      Alert.alert("Erro", "Por favor, preencha ambos os campos!");
      return;
    }
  
    try {
      const response = await fetch('http://192.168.15.3:5231/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username: username, Senha: password }), // Mantenha "Senha" se for o que a API espera
      });
  
      const data = await response.json(); // Sempre tenta obter a resposta JSON
  
      if (response.ok) {
        Alert.alert("Sucesso", data.message);
        navigation.navigate('Dashboard');  // Navega para a tela Dashboard após login bem-sucedido
      } else {
        console.log('Erro de login:', data); // Registra a resposta de erro
        Alert.alert("Erro", data.message || "Credenciais inválidas");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login.");
    }
  };
  

  return (
    <View style={styles.container}>
      <Image 
        source={require('./icons/bluefarm.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#E6F2FF',
  },
  logo: {
    width: 300, 
    height: 300, 
    marginBottom: 30,
    alignSelf: 'center', 
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    width: '100%', 
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Login;

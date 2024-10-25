import React, { useState } from 'react';  
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/Login';
import Dashboard from './src/pages/Dashboard';
import ControleDeProducao from './src/pages/ControleDeProducao';
import GestaoDeEstoque from './src/pages/GestaoDeEstoque';
import GestaoDeVendas from './src/pages/GestaoDeVendas';
import Cultivo from './src/pages/Dashboard/pages/Cultivo';  
import EstoqueDeProdutos from './src/pages/Dashboard/pages/EstoqueProdutos'; 
import GestaoDeClientes from './src/pages/GestaoDeVendas/pages/GestaoClientes'; 
import RegistroDeVendas from './src/pages/GestaoDeVendas/pages/RegistroVendas'; 
import Colheita from './src/pages/ControleDeProducao/pages/Colheita'; 
import Irrigacao from './src/pages/ControleDeProducao/pages/Irrigacao'; 
import ControleTemperatura from './src/pages/ControleDeProducao/pages/ControleTemperatura'; 
import EstoqueProdutosAgricolas from './src/pages/GestaoDeEstoque/pages/ProdutosAgricolas';
import MovimentacaoEstoque from './src/pages/GestaoDeEstoque/pages/MovEstoque'; 
import GestaoArmazenamento from './src/pages/GestaoDeEstoque/pages/GestaoArmazenamento'; 

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {props => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ControleDeProducao" component={ControleDeProducao} />
        <Stack.Screen name="GestaoDeEstoque" component={GestaoDeEstoque} />
        <Stack.Screen name="GestaoDeVendas" component={GestaoDeVendas} />
        <Stack.Screen name="Cultivo" component={Cultivo} />  
        <Stack.Screen name="EstoqueDeProdutos" component={EstoqueDeProdutos} />
        <Stack.Screen name="GestaoDeClientes" component={GestaoDeClientes} /> 
        <Stack.Screen name="RegistroDeVendas" component={RegistroDeVendas} /> 
        <Stack.Screen name="Colheita" component={Colheita} />
        <Stack.Screen name="Irrigacao" component={Irrigacao} />
        <Stack.Screen name="ControleTemperatura" component={ControleTemperatura} />
        <Stack.Screen name="EstoqueProdutosAgricolas" component={EstoqueProdutosAgricolas} />
        <Stack.Screen name="MovimentacaoEstoque" component={MovimentacaoEstoque} />
        <Stack.Screen name="GestaoArmazenamento" component={GestaoArmazenamento} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

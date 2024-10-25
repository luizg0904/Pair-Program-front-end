import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Componente de Gestão de Vendas com navegação e funcionalidades específicas
const SalesManagement = ({ navigation }) => {
    // Estado para controlar a visibilidade do menu de logout
    const [showLogout, setShowLogout] = useState(false);

    // Função para alternar a visibilidade do menu de logout
    const toggleLogoutMenu = () => {
        setShowLogout(!showLogout);
    };
    return (
        <View style={styles.container}>
            {/* Barra lateral com opções de navegação */}
            <View style={styles.sidebar}>
                <TouchableOpacity
                    style={styles.sidebarItem}
                    onPress={() => navigation.navigate('Dashboard')}
                >
                    <Image
                        source={require('./icons/Dashboard.png')}
                        style={styles.imageDashboard}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sidebarItem}
                    onPress={() => navigation.navigate('ControleDeProducao')}
                >
                    <Image
                        source={require('./icons/ControleDeProducao.png')}
                        style={styles.imageControleDeProducao}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sidebarItem}
                    onPress={() => navigation.navigate('GestaoDeEstoque')}
                >
                    <Image
                        source={require('./icons/GestaoDeEstoque.png')}
                        style={styles.imageGestaoDeEstoque}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sidebarItem}
                    onPress={() => navigation.navigate('GestaoDeVendas')}
                >
                    <Image
                        source={require('./icons/GestaoDeVendas.png')}
                        style={styles.imageGestaoDeVendas}
                    />
                </TouchableOpacity>
                <View style={styles.footer}></View>
            </View>

            {/* Conteúdo principal com funcionalidades de gestão de vendas */}
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={toggleLogoutMenu} style={styles.profile}>
                        <Icon name="account-circle" size={30} color="#fff" />
                    </TouchableOpacity>

                    {/* Exibir botão "Sair" se o menu de logout estiver visível */}
                    {showLogout && (
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.logoutText}>Sair</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.content}>
                    {/* Cartões interativos para diferentes funcionalidades de vendas */}
                    <TouchableOpacity style={styles.card} onPress={() => {navigation.navigate('RegistroDeVendas')}}>
                        <Icon name="file-document-edit" size={45} color="#000" />
                        <Text style={styles.cardTitle}>Registro de Vendas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={() => {navigation.navigate('GestaoDeClientes')}}>
                        <Icon name="handshake" size={45} color="#000" />
                        <Text style={styles.cardTitle}>Gestão de Clientes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

// Estilos do componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#E6F2FF',
    },

    scrollView: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#007bff',
    },

    profile: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    logoutButton: {
        position: 'absolute',
        top: 40,
        left: 40,
        padding: 9,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        zIndex: 1,
    },

    logoutText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },

    logoutButton: {
        position: 'absolute',
        top: 40,
        left: 40,
        padding: 9,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        zIndex: 1,
    },

    logoutText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },


    imageDashboard: {
        width: 45,
        height: 45,
    },

    imageControleDeProducao: {
        width: 45,
        height: 45,
    },

    imageGestaoDeEstoque: {
        width: 45,
        height: 45,
    },

    imageGestaoDeVendas: {
        width: 45,
        height: 45,
    },

    content: {
        padding: 16,
    },

    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },

    sidebar: {
        width: '25%',
        backgroundColor: '#007bff',
        padding: 16,
        justifyContent: 'space-between',
    },

    sidebarItem: {
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
    },

    sidebarText: {
        fontSize: 16,
        color: '#000',
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 'auto',
    },

});

export default SalesManagement;

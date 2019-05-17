import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    FlatList,
    TouchableHighlight
} from "react-native";

import api from "../services/api";

import jwt from "jwt-decode";

class ConsultasMedico extends Component {
    constructor() {
        super();
        this.state = {
            // id: '',
            // descricao: '',
            nome: '',
            listaConsultas: []
        }
    }

    static navigationOptions = {
        title: 'Minhas Consultas',
        headerTitleStyle: {
            marginLeft: 60,
            // color: 'white',
            fontWeight: 'bold'
            // textAlign: 'right'
        },
        headerLeft: null,
        // headerLayoutPreset: 'center',

        headerRight: (
            <TouchableHighlight onPress={() => this.Sair()}>
                <Image
                    style={{
                        width: 30, height: 30, marginRight: 20
                        // tintColor: 'white'
                    }}
                    // resizeMode={'contain'} 
                    source={require('../assets/img/logout.png')}
                // onPress={this.Sair()}
                />
            </TouchableHighlight>
        ),

        headerStyle: {
            backgroundColor: 'lightblue',
        },

        // headerMode: 'none'
    };

    listaconsultas = async () => {
        const token = await AsyncStorage.getItem("asdd");
        const resposta = await api.get("/consultas", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        const dadosApi = resposta.data
        this.setState({ listaConsultas: dadosApi })
    }

    buscarDadosDoStorage = async () => {
        try {
            const value = await AsyncStorage.getItem("user");
            if (value !== null) {
                this.setState({ nome: jwt(value).Nome });
                this.setState({ token: value });
            }
        } catch (error) { }

        this.listaconsultas();
    };

    Sair = async () => {
        await AsyncStorage.removeItem('user');
        alert('Deslogado com sucesso.');
        this.props.navigation.navigate('Login');
    }

    componentDidMount() {
        this.buscarDadosDoStorage();
        this.listaconsultas();
    }

    renderizarStatus(item) {
        if (item.idSituacao == 1 || item.idSituacao === 'Agendado') {
            return (

                <View style={{ width: '25%', backgroundColor: '#80BFDB', padding: '2%' }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }} >{item.idSituacao}</Text>
                </View>
            );
        } else if (item.idSituacao == 3 || item.idSituacao === 'Realizado') {
            return (

                <View style={{ width: '25%', backgroundColor: '#88D3A4', padding: '2%' }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{item.idSituacao}</Text>
                </View>
            );
        } else {
            // console.warn("chegou");
            return (

                <View style={{ width: '25%', backgroundColor: '#D38888', padding: '2%' }}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{item.idSituacao}</Text>
                </View>
            );
        }
    }

    render() {

        return (
            <View>

                {/* <Text>
                    {this.state.nome}
                </Text> */}


                {/* botao(iamgem) deslogar */}
                {/* <Image
                    style={{ width: 50, height: 50 }}
                    source={require('../assets/img/logout.png')}
                    onPress={this.Sair()}
                /> */}

                <View style={{ elevation: 3, margin: '5%' }}>
                    {/* <View key={consulta.id} style={{ elevation: 3, margin: '10%' }}> */}
                    {/* <Text style={{ fontWeight: 'bold' }} > Consulta #{consulta.id} </Text> */}

                    <View>
                        <FlatList
                            data={this.state.listaConsultas}
                            keyExtractor={item => item.id}
                            renderItem={this.renderizaItem}
                        />
                    </View>

                    {/* <View key={consulta.id}>
                                    <Text>{consulta.idProntuario}</Text>
                                    <Text>{consulta.descricao}</Text>
                                    <Text>
                                        {consulta.dataConsulta.split("T")[0].split("-")[2]}/
                                        {consulta.dataConsulta.split("T")[0].split("-")[1]}/
                                        {consulta.dataConsulta.split("T")[0].split("-")[0]}
                                    </Text>

                                </View> */}
                </View>

            </View>


            // </View>
        );
    }

    renderizaItem = ({ item }) => {
        // console.warn(item.id);

        return (

            <View style={{ margin: '5%', padding: '3%', backgroundColor: 'white', elevation: 3 }}>
                <View key={item.id}>

                    <View>
                        <Text style={{ marginBottom: '2%', fontWeight: 'bold', borderBottomColor: '#cccccc', borderBottomWidth: 1, fontSize: 18 }}>Consulta #{item.id} </Text>

                        <View>
                            {this.renderizarStatus(item)}
                        </View>
                    </View>

                    <Text>Nome do paciente: {item.idProntuario}</Text>
                    <Text>Descrição: {item.descricao}</Text>
                    <Text>Data da consulta: {item.dataConsulta.split("T")[0].split("-")[2]}/
                        {item.dataConsulta.split("T")[0].split("-")[1]}/
                        {item.dataConsulta.split("T")[0].split("-")[0]}
                    </Text>
                </View>
            </View>
        );

        // helena.strada@spmedicalgroup.com.br
    }
}

// data.slice(0,2). telefone
// https://pusher.com/tutorials/chat-react-native
export default ConsultasMedico;
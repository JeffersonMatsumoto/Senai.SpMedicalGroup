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
    FlatList
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

    Sair() {
        AsyncStorage.removeItem('user');
        // alert('Deslogado com sucesso.');
    }

    componentDidMount() {
        this.buscarDadosDoStorage();
        this.listaconsultas();
    }

    rederizarRed() {
        console.warn("chegou");
        if (item.idSituacao == 3) {
            return (

                <View style={{ backgroundColor: '#80BFDB', padding: '2%' }}>
                    <Text>ahsduahsudhaushd</Text>
                </View>
            );
        } else if (item.idSituacao == 2) {
            return (

                <View style={{ backgroundColor: '#88D3A4', padding: '2%' }}>
                    <Text>iasduhasud</Text>
                </View>
            );
        } else {
            console.warn("chegou");
            return (

                <View style={{ backgroundColor: '#D38888', padding: '2%' }}>
                    <Text>asdasdasd</Text>
                </View>
            );
        }
    }


    render() {

        return (
            <View>

                <Text>
                    {this.state.nome}
                </Text>

                <Image
                    style={{ width: 50, height: 50 }}
                    source={require('../assets/img/logout.png')}
                    onPress={this.Sair()}
                />

                <View>
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
        console.warn(item.id);

        return(

            <View>
        <View key={item.id}>
            <Text style={{color: 'black'}}>{item.idProntuario}</Text>
            <Text>{item.descricao}</Text>
            <Text>
                {item.dataConsulta.split("T")[0].split("-")[2]}/
                                        {item.dataConsulta.split("T")[0].split("-")[1]}/
                                        {item.dataConsulta.split("T")[0].split("-")[0]}
            </Text>
    
    
    
        </View>
        </View>
    );
    }
}



export default ConsultasMedico;
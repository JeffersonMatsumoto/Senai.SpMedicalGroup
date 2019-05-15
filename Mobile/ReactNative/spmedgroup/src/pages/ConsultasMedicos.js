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
            id: '',
            descricao: '',
            nome: '',
            // token: '',
            listaConsultas: []
        }
    }

    listaconsultas = async () => {
        const resposta = await api.get("/consultas", {
            headers: {
                'Authorization': 'Bearer ' + (this.state.token)
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
        // this.listarconsultas();
    }

    render() {
        // if (consulta.idSituacao == 3) {
        //     <View style={{ backgroundColor: '#80BFDB', padding: '2%' }}>
        //         {consulta.idSituacao}
        //     </View>
        // } else if (consulta.idSituacao == 2) {
        //     <View style={{ backgroundColor: '#88D3A4', padding: '2%' }}>
        //         {consulta.idSituacao}
        //     </View>
        // } else
        //     <View style={{ backgroundColor: '#D38888', padding: '2%' }}>
        //         {consulta.idSituacao}
        //     </View>
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
                    {this.state.listaConsultas.map(function (consulta) {
                        return (
                            <View style={{ elevation: 3 }}>
                                <Text style={{ borderBottomColor: 'black', borderBottomWidth: '1%', fontWeight: 'bold' }}> Consulta #{consulta.id} </Text>

                                <View>
                                    {consulta.idSituacao}
                                </View>

                                <View key={consulta.id}>

                                    <Text>{consulta.idProntuario}</Text>
                                    <Text>{consulta.descricao}</Text>
                                    <Text>
                                        {consulta.dataConsulta.split("T")[0].split("-")[2]}
                                        {consulta.dataConsulta.split("T")[0].split("-")[1]}
                                        {consulta.dataConsulta.split("T")[0].split("-")[0]}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>

                {/* <View>
                    <FlatList
                        data={this.state.listaConsultas}
                        keyExtractor={item => item.nome}
                        renderItem={this.renderizaItem}
                    />
                </View> */}
            </View>
        );
    }

    // renderizaItem = ({ item }) => (
    //     <ScrollView>

    //         <View>
    //             <View>
    //                 <Text> Nome: </Text>
    //                 <Text>  {item.nome} </Text>
    //             </View>

    //             <View>
    //                 <Text> Título: </Text>
    //                 <Text>  {item.lancamento} </Text>
    //             </View>
    //         </View>

    //     </ScrollView>
    // );
}

export default ConsultasMedico;
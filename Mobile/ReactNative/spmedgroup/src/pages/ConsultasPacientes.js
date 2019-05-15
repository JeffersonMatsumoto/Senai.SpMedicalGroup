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

class ConsultasPaciente extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            descricao: '',
            listaConsulta: []
        }
    }

    // componentDidMount() {
    //     this.listarconsultas();
    // }

    Sair() {
        AsyncStorage.removeItem('user');
        alert('Deslogado com sucesso.');
    }

    render() {
        if (consulta.idSituacao == 3) {
            <View style={{ backgroundColor: '#80BFDB', padding: '2%' }}>
                {consulta.idSituacao}
            </View>
        } else if (consulta.idSituacao == 2) {
            <View style={{ backgroundColor: '#88D3A4', padding: '2%' }}>
                {consulta.idSituacao}
            </View>
        } else
            <View style={{ backgroundColor: '#D38888', padding: '2%' }}>
                {consulta.idSituacao}
            </View>

        return (
            <ScrollView>

                <Text> {} </Text>

                <Image
                    style={{ width: 50, height: 50 }}
                    source={require('../assets/img/logout.png')}
                    onPress={this.Sair()}
                />

                {/* <View>
                    <FlatList
                        data={this.state.listaConsultas}
                        keyExtractor={item => item.nome}
                        renderItem={this.renderizaItem}
                    />
                </View> */}

                <View>
                    {this.state.listaConsulta.map(function (consulta) {
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


            </ScrollView>
        );
    }
}

export default ConsultasPaciente;
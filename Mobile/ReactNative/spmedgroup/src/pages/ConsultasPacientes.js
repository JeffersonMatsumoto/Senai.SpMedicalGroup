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
    TouchableHighlight,
    Alert
} from "react-native";

import api from "../services/api";

import jwt from "jwt-decode";

class ConsultasPaciente extends Component {
    constructor() {
        super();
        this.state = {
            nomeLogado: '',
            semConsulta: '',
            listaConsultas: []
        }
    }

    // https://reactnavigation.org/docs/en/header-buttons.html

    // static navigationOptions = {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Minhas Consultas',
            headerStyle: {
                backgroundColor: 'lightgreen',
            },
            headerTitleStyle: {
                // marginLeft: 100,
                // justifyContent: 'center',
                alignSelf: 'center',
                // textAlign: 'center',
                // marginStart: 120,
                fontWeight: 'bold'
            },
            headerLeft: null,
            tabBarVisible: false,
            headerRight: (
                <TouchableOpacity onPress={() => params.chamarSair()}>
                    <Image
                        style={{
                            width: 30, height: 30, marginRight: 20
                        }}
                        source={require('../assets/img/logout.png')}
                    />

                    {/* <Text style={{
                    // justifyContent: 'flex-end',
                    // alignSelf: 'center',
                    // textAlign: 'center',
                    marginEnd: 50,
                    color: 'black', fontWeight: 'bold'
                }}>SAIR</Text> */}

                </TouchableOpacity>
            ),
        };
    };

    listaconsultas = async () => {
        const token = await AsyncStorage.getItem("user");
        const resposta = await api.get("/consultas", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        // if (resposta.length > 0) {

        //     const dadosApi = resposta.data
        //     this.setState({ listaConsultas: dadosApi })

        // } else {

        //     this.setState({ semConsulta: 'Você não possui consultas cadastradas, contate nossos atendentes para agendar consultas ou para obter mais informações.' })

        // }

        const dadosApi = resposta.data
        this.setState({ listaConsultas: dadosApi })
    }

    buscarDadosDoStorage = async () => {
        try {
            const value = await AsyncStorage.getItem("user");
            if (value !== null) {
                this.setState({ nomeLogado: jwt(value).Nome });
                this.setState({ token: value });
            }
        } catch (error) { }

        this.listaconsultas();
    };

    // Sair = async () => {
    //     await AsyncStorage.removeItem('user');
    //     alert('Deslogado com sucesso.');
    //     this.props.navigation.navigate('Login');
    // }


    // https://facebook.github.io/react-native/docs/modal
    // https://aboutreact.com/custom-header-using-navigation-options-in-react-native/

    Sair = () => {

        Alert.alert(
            'Confirmar ação'
            ,
            'Deseja encerrar sua sessão?'
            , [
                {
                    text: 'Sim', onPress: async () => {
                        await AsyncStorage.removeItem('user')
                        this.props.navigation.navigate('Login');
                    }
                },
                { text: 'Não' }
            ]
        );
    }

    componentDidMount() {
        this.props.navigation.setParams({ chamarSair: this.Sair });
        console.disableYellowBox = true;
        this.buscarDadosDoStorage();
        this.listaconsultas();
    }

    renderizarStatus(item) {
        if (item.idSituacao == 1 || item.idSituacao === 'Agendado') {
            return (

                <View style={{ borderRadius: 3, width: '100%', backgroundColor: '#80BFDB', paddingHorizontal: '3%' }}>
                    <Text style={{ padding: 5, fontWeight: 'bold', textAlign: 'center' }} >{item.idSituacao}</Text>
                </View>
            );
        } else if (item.idSituacao == 3 || item.idSituacao === 'Realizado') {
            return (

                <View style={{ borderRadius: 3, width: '100%', backgroundColor: '#88D3A4', paddingHorizontal: '3%' }}>
                    <Text style={{ padding: 5, fontWeight: 'bold', textAlign: 'center' }}>{item.idSituacao}</Text>
                </View>
            );
        } else {
            return (

                <View style={{ borderRadius: 3, width: '100%', backgroundColor: '#D38888', paddingHorizontal: '3%' }}>
                    <Text style={{ padding: 5, fontWeight: 'bold', textAlign: 'center' }}>{item.idSituacao}</Text>
                </View>
            );
        }
    }

    render() {
        if (this.state.listaConsultas.length > 0) {
            return (
                <ScrollView
                    style={{ flex: 1 }}
                >

                    <Text style={styles.bemvindo}> Bem vindo(a) {this.state.nomeLogado} </Text>


                    {/* <Text 
                // style={styles.semConsulta}
                >
                {this.state.semConsulta}
                </Text> */}

                    <View style={{ elevation: 3 }}>
                        <FlatList
                            //esconder barra de scroll
                            showsVerticalScrollIndicator={false}
                            data={this.state.listaConsultas}
                            keyExtractor={item => item.id}
                            renderItem={this.renderizaItem}
                        />
                    </View>

                    {/* <TouchableOpacity
                    onPress={this.Sair}
                >
                    <Text style={{ elevation: 3 ,marginHorizontal: '40%',width: 'auto', borderRadius: 100, backgroundColor: 'darkred', textAlign: 'center', padding: '5%' , color: 'white', fontWeight: 'bold' }}>
                        SAIR
                    </Text>
                </TouchableOpacity> */}

                </ScrollView>
            )
        } else {
            return (
                <View>
                    <Text style={styles.bemvindo}> Bem vindo(a) {this.state.nomeLogado} </Text>
                    <Text style={styles.semConsulta}>Você não possui consultas cadastradas, contate nossos atendentes para agendar consultas ou para obter mais informações.</Text>
                </View>
                

            );
        }
    }

    renderizaItem = ({ item }) => {
        // if(item === null){
        // return (
        //     <View>
        //         <Text>Você não possui consultas cadastradas, contate nossos atendentes agendamentos de novas consultas ou para obter mais informações.</Text>
        //     </View>
        // );
        // } else {
        return (
            <View style={{ margin: '4%', padding: '3%', backgroundColor: 'white', elevation: 3 }}>
                <View key={item.id}>

                    <View style={{ padding: '2%', justifyContent: 'space-between', marginBottom: '2%', borderBottomColor: '#cccccc', borderBottomWidth: 1, flexDirection: 'row' }}>
                        <Text
                            style={{
                                // justifyContent: 'flex-start',
                                fontWeight: 'bold',
                                fontSize: 20
                            }}
                        >Consulta #{item.id} </Text>

                        <View>
                            {this.renderizarStatus(item)}
                        </View>
                    </View>

                    <View>
                        <Text
                            style={styles.label}
                        // {{ borderRadius: 4, textAlign: 'center', backgroundColor: 'grey', color: 'white', padding: '1%', fontWeight: 'bold' }}
                        >
                            MÉDICO RESPONSÁVEL
                        </Text>

                        <Text
                            style={styles.details}
                        // {{ textAlign: 'center', padding: '2%', fontSize: 20 }}
                        >{item.idMedico}</Text>
                    </View>

                    <View
                    // style={{  textAlign: 'center' }}
                    >
                        <Text
                            style={styles.label}
                        // {{ borderRadius: 4, textAlign: 'center',  backgroundColor: 'grey', color: 'white', padding: '1%', fontWeight: 'bold'}}
                        >
                            DESCRIÇÃO
                        </Text>

                        <Text
                            style={styles.details}
                        // {{ padding: '2%', textAlign: 'center' }}
                        >{item.descricao}</Text>
                    </View>

                    <View>
                        <Text
                            style={styles.label}
                        // {{ borderRadius: 4, backgroundColor: 'grey', color: 'white', textAlign: 'center', padding: '1%', fontWeight: 'bold' }}
                        >
                            DATA DA CONSULTA
                        </Text>

                        <Text
                            style={styles.details}
                        // {{ padding: '2%', textAlign: 'center' }}
                        >
                            {item.dataConsulta.split("T")[0].split("-")[2]}/
                            {item.dataConsulta.split("T")[0].split("-")[1]}/
                            {item.dataConsulta.split("T")[0].split("-")[0]}
                        </Text>
                    </View>

                    {/* <Text>
                        Descrição:
                        <Text>{item.descricao}</Text>
                    </Text>

                    <Text>Data da consulta: {item.dataConsulta.split("T")[0].split("-")[2]}/
                        {item.dataConsulta.split("T")[0].split("-")[1]}/
                        {item.dataConsulta.split("T")[0].split("-")[0]}
                    </Text> */}
                </View>
            </View>
        );
        // }

        // helena.strada@spmedicalgroup.com.br
    }
}

const styles = StyleSheet.create({

    bemvindo: {
        textAlign: 'center',
        margin: '2%',
        marginTop: '4%'
    },

    semConsulta: {
        textAlign: 'center',
        // flex: 1,
        flexWrap: 'wrap',
        margin: '1%',
        color: 'black',
        fontSize: 18
        // , marginTop: '50%'
        // , textAlignVertical : 'center'
        , justifyContent: 'center', alignItems: 'center'

    },

    label: {
        borderRadius: 4, backgroundColor: '#bfbfbf', color: 'white', textAlign: 'center', padding: '1%', fontWeight: 'bold'
    },

    details: {
        textAlign: 'center', padding: '2%', fontSize: 18
    }



})

export default ConsultasPaciente;
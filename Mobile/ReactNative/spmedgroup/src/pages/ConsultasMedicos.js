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
    Alert,
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
            nomeLogado: '',
            listaConsultas: []
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
        title: 'Minhas Consultas',
        headerTitleStyle: {
            // marginLeft: 120,
            // color: 'white',
            fontWeight: 'bold'
            // textAlign: 'right'
        },
        headerLeft: null,
        // headerLayoutPreset: 'center',

        headerRight: (
            <TouchableOpacity onPress={() => params.chamarSair()}>
                <Image
                    style={{
                        width: 30, height: 30, marginRight: 20
                        // tintColor: 'white'
                    }}
                    // resizeMode={'contain'} 
                    source={require('../assets/img/logout.png')}
                // onPress={this.Sair()}
                />
            </TouchableOpacity>
        ),

        headerStyle: {
            backgroundColor: 'lightblue',
        },
    };
        // headerMode: 'none'
    };

    listaconsultas = async () => {
        const token = await AsyncStorage.getItem("user");
        const resposta = await api.get("/consultas", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        // if (resposta.lenght > 0) {

        //     this.setState({ listaConsultas: dadosApi })
        //     const dadosApi = resposta.data

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

    // Sair = async () => {
    //     await AsyncStorage.removeItem('user');
    //     alert('Deslogado com sucesso.');
    //     this.props.navigation.navigate('Login');
    // }

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
        if (this.state.listaConsultas.length === 0) {
            return (
                <View>
                    <Text style={styles.bemvindo}> Bem vindo(a) {this.state.nomeLogado} </Text>
                    <Text style={styles.semConsulta}>Você não possui consultas cadastradas, contate nossos atendentes para agendar consultas ou para obter mais informações.</Text>
                </View>
            )
        } else {
        return (
            <View>
                <Text style={styles.bemvindo}> Bem vindo(a) {this.state.nomeLogado} </Text>
                {/* <Text>
                    {this.state.nome}
                </Text> */}

                {/* <Text style={styles.semConsulta}>{this.state.semConsulta}</Text> */}


                {/* botao(iamgem) deslogar */}
                {/* <Image
                    style={{ width: 50, height: 50 }}
                    source={require('../assets/img/logout.png')}
                    onPress={this.Sair()}
                /> */}

                <View style={{ elevation: 3 }}>
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
}

    renderizaItem = ({ item }) => {
        // console.warn(item.id);

        return (

            <View style={{ margin: '4%', padding: '3%', backgroundColor: 'white', elevation: 3 }}>
                <View key={item.id}>

                    <View style={{ padding: '2%', justifyContent: 'space-between', marginBottom: '2%', borderBottomColor: '#cccccc', borderBottomWidth: 1, flexDirection: 'row' }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>
                            Consulta #{item.id}
                        </Text>

                        <View>
                            {this.renderizarStatus(item)}
                        </View>
                    </View>

                    <View>
                        <Text style={{ borderRadius: 4, textAlign: 'center', backgroundColor: '#bfbfbf', color: 'white', padding: '1%', fontWeight: 'bold' }}>NOME DO PACIENTE</Text>
                        <Text style={{ textAlign: 'center', padding: '2%', color: 'black',fontSize: 18 }}>{item.idProntuario}</Text>
                    </View>


                    <View>
                        <Text style={{ borderRadius: 4, textAlign: 'center',  backgroundColor: '#bfbfbf', color: 'white', padding: '1%', fontWeight: 'bold' }}>
                            DESCRIÇÃO
                        </Text>

                        <Text style={{ padding: '2%', textAlign: 'center', color: 'black',fontSize: 18 }}>{item.descricao}</Text>
                    </View>


                    <View>
                        <Text style={{ borderRadius: 4, backgroundColor: '#bfbfbf', color: 'white', textAlign: 'center', padding: '1%', fontWeight: 'bold' }}>
                            DATA DA CONSULTA
                        </Text>

                        <Text style={{ padding: '2%', textAlign: 'center', color: 'black',fontSize: 18 }}>
                            {item.dataConsulta.split("T")[0].split("-")[2]}/
                            {item.dataConsulta.split("T")[0].split("-")[1]}/
                            {item.dataConsulta.split("T")[0].split("-")[0]}
                        </Text>
                    </View>

                </View>
            </View>
        );

        // helena.strada@spmedicalgroup.com.br
    }
}

const styles = StyleSheet.create({
    bemvindo : {
        textAlign: 'center',
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: '4%'
    }
    ,
    semConsulta: {
        textAlign: 'center',
        flex: 1,
        flexWrap: 'wrap',
        margin: '1%',
        color: 'black',
        fontSize: 18
        , marginTop: '50%'
        , justifyContent: 'center', alignItems: 'center'

    },
})

// data.slice(0,2). telefone
// https://pusher.com/tutorials/chat-react-native
export default ConsultasMedico;
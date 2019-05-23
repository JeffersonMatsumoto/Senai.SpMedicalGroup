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
    Alert
} from "react-native";

import api from "../services/api";

import jwt from "jwt-decode";
import { ScrollView } from 'react-native-gesture-handler';


class Login extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state =
            {
                email: "",
                senha: "",
                mensagemErro: ""
            };
    }

    // validateEmail = (email) => {
    //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //       return re.test(email);
    //   };

    // validarInputs = () => {
    //     var email = this.state.email
    //     if (email == null || email.trim().length === 0 ) {
    //         this.setState({ erro: "O campo de email está vazio, por favor preencha este campo." })
    //     }
    //     var senha = this.state.senha
    //     if (senha == null || senha.trim().length === 0) {
    //         this.setState({ erro: "O campo de senha está vazio, por favor preencha este campo." })
    //     }
    // }

    realizarLogin = async () => {
        // console.disableYellowBox = true;

        const resposta = await api.post("/login", {
            email: this.state.email,
            senha: this.state.senha
        })
        .catch(erro => {
            // this.setState({ mensagemErro : "" })
            this.setState({ mensagemErro : 'Email ou senha inválido(s)'});
        })
        // this.props.navigation.navigate("MainNavigator");
        if (resposta.status === 200) {
            const token = resposta.data.token;
            await AsyncStorage.setItem("user", token);

            if (jwt(token).Permissao === "Medico") {
                this.props.navigation.navigate("Consultas Medico");
            } else if (jwt(token).Permissao === "Paciente") {
                this.props.navigation.navigate("Consultas Paciente");
            } else {
                Alert.alert("E-mail ou senha inserido é inválido.");
                this.props.navigation.navigate("/login");
            }
        }
    };

    // https://facebook.github.io/react-native/docs/keyboardavoidingview

    render() {
        console.disableYellowBox = true;
        return (
            // <ImageBackground>
            <ScrollView style={{ height: '100%', marginTop: '10%'}}>
                <Image
                    source={require("../assets/img/icon-login.png")}
                    style={{ resizeMode: 'contain', width: 150, height: 150, alignSelf: "center", marginTop: '15%', marginBottom: '10%' }}
                />
                <TextInput
                    style={styles.input}
                    // blurOnSubmit={true}
                    placeholder="Insira seu e-mail"
                    placeholderTextColor="#808080"
                    underlineColorAndroid="#666666"
                    autoCapitalize = 'none'
                    // defaultValue="helena.strada@spmedicalgroup.com.br" 
                    // defaultValue="alexandre@gmail.com"
                    onChangeText={email => this.setState({ email, mensagemErro : '' })}
                // onSubmitEditing{this.validarInputs}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Insira sua senha"
                    placeholderTextColor="#808080"
                    secureTextEntry={true}
                    autoCapitalize = 'none'
                    // defaultValue="654321"
                    // defaultValue="123456"
                    underlineColorAndroid="#666666"
                    onChangeText={senha => this.setState({ senha, mensagemErro : '' })}
                />

                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{this.state.mensagemErro}</Text>
                
                <TouchableOpacity
                    onPress={this.realizarLogin}
                    style={styles.button}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        LOGIN
                    </Text>
                </TouchableOpacity>

            </ScrollView>
            // </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    //     overlay: {
    //         ...StyleSheet.absoluteFillObject,
    //         backgroundColor: "rgba(183, 39, 255, 0.79)"
    //     },
    //     main: {
    //         width: "100%",
    //         height: "100%",
    //         justifyContent: "center",
    //         alignContent: "center",
    //         alignItems: "center"
    //     }
    input: {
        marginHorizontal: '15%',
        marginBottom: '3%'
    },

    button: {
        alignSelf: "center",
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: '5%',
        elevation: 3,
        borderWidth: 0.5,
        borderColor: 'black',
        backgroundColor: '#82C1D7'
    }
});

export default Login;
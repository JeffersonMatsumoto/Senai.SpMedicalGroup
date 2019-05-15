import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from "react-native";

import api from "../services/api";

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

    realizarLogin = async () => {

        const resposta = await api.post("/login", {
            email: this.state.email,
            senha: this.state.senha
        });

        const token = resposta.data.token;
        await AsyncStorage.setItem("user", token);
        // this.props.navigation.navigate("MainNavigator");
        // if (data.status === 200) {

            if (parseJwt().Permissao === "Medico") {
                this.props.navigation.navigate("/ConsultasMedico");
            } else if (parseJwt().Permissao === "Paciente") {
                this.props.navigation.navigate("/ConsultasPaciente");
            } else {
                this.props.navigation.navigate("/login");
            }
        // }
    };

    render() {
        return (
            // <ImageBackground>
                <View>
                    <Image
                        source={require("../assets/img/icon-login.png")}
                        style={{ resizeMode:'contain',width:150, height:150, alignSelf:"center", marginTop: '15%', marginBottom: '10%'}}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        placeholderTextColor="#808080"
                        underlineColorAndroid="#666666"
                        onChangeText={email => this.setState({ email })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        placeholderTextColor="#808080"
                        secureTextEntry={true}                        
                        underlineColorAndroid="#666666"
                        onChangeText={senha => this.setState({ senha })}
                    />

                    <TouchableOpacity
                        onPress={this.realizarLogin}
                        style={styles.button}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold'}}>
                            LOGIN
                        </Text>
                    </TouchableOpacity>

                </View>
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
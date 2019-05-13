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

        if (data.status === 200) {
            await AsyncStorage.setItem("user", token);

            if (parseJwt().Permissao === "Medico") {
                this.props.navigation.navigate("/ConsultasMedico");
            } else if (parseJwt().Permissao === "Paciente") {
                this.props.navigation.navigate("/ConsultasPaciente");
            } else {
                this.props.navigation.navigate("/login");
            }
        }
    };

    render() {
        return (
            // <ImageBackground>
                <View>
                {/* <View style={styles.overlay} />
                <View style={styles.main}> */}

                    <Image
                        source={require("../assets/img/icon-login.png")}
                        style={styles.mainImgLogin}
                    />

                    <TextInput
                        placeholder="e-mail"
                        placeholderTextColor="#000"
                        underlineColorAndroid="#000"
                        onChangeText={email => this.setState({ email })}
                    />

                    <TextInput
                        placeholder="senha"
                        placeholderTextColor="#000"
                        password="true"
                        underlineColorAndroid="#000"
                        onChangeText={senha => this.setState({ senha })}
                    />

                    <TouchableOpacity
                        onPress={this.realizarLogin}
                    >
                        <Text>
                            LOGIN
                        </Text>
                    </TouchableOpacity>

                </View>
            // </ImageBackground>
        );
    }
}

// const styles = StyleSheet.create({
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
// });

export default Login;
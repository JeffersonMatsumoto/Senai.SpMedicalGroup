import React, { Component } from "react";
import { parseJwt } from '../../services/auth.js';
// import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.js';
import Rodape from '../../components/Rodape/Rodape.js';
import { Form, Button, InputGroup } from 'react-bootstrap';
// import LoginBanner from '../../assets/img/Login-banner.jpg';
// import Logo from '../../assets/img/Logo.png'

import email from '../../assets/img/email.png'
import senha from '../../assets/img/senha.png'
import Logo from '../../assets/img/Logo.png'

import "../../assets/css/login.css";

import axios from "axios";


// add referencia documentacao
// https://heelpbook.altervista.org/2014/javascript-events-onblur-onchange-onclick-onfocus-onselect-onsubmit/
// https://www.npmjs.com/package/axios

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            senha: '',
            erroMensagem: ''
        }
    }
    // componentWillUpdate() {
    //     this.efetuaLogin();
    // }

    // componentDidMount(){
    //     this.efetuaLogin();
    // }

    atualizaEstadoEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }

    //loop
    efetuarLogin(event) {
        event.preventDefault();
        axios.post("http://localhost:5000/api/login",

            {
                email: this.state.email,
                senha: this.state.senha
            })

            .then(data => {
                if (data.status === 200) {
                    // console.log(data);
                    localStorage.setItem("user", data.data.token);
                    // this.props.history.push("/consultasmedico");
                    console.log(parseJwt().Permissao);
                    this.props.history.push("/funcionalidades");
                    if (parseJwt().Permissao === 'Administrador') {
                        console.log("Teste para aparecer no console");
                        this.props.history.push("/funcionalidades");
                    } else if (parseJwt().Permissao === "Medico") {
                        this.props.history.push("/consultasmedico");
                    } else if (parseJwt().Permissao === "Paciente") {
                        this.props.history.push("/consultaspaciente");
                    } else {
                        this.props.history.push("/login")
                    }
                }
            })
            .catch(erro => {
                this.setState({ erroMensagem: 'O endereço de email e/ou a senha que você inseriu é inválido.\n Tente novamente.' });
            })
    }

    render() {
        return (
            <div>
                <Header />
                <div id="container-login">
                    <div className="login">
                        <form id="form-login" onSubmit={this.efetuarLogin.bind(this)}>



                            <Form.Group id="form-title">
                                <img id="img-login" src={Logo} alt="logo-login" />
                                {/* <h4><b>LOGIN</b></h4> */}
                            </Form.Group>


                            <Form.Group controlId="formBasicEmail">

                                {/* <Form.Label>
                                    Email
                                    </Form.Label> */}

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">
                                            <img
                                                src={email}
                                                width="20em"
                                                height="20em"
                                                alt="Ícone de e-mail" /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        value={this.state.email}
                                        onChange={this.atualizaEstadoEmail.bind(this)}
                                        type="email"
                                        placeholder="exemplo@provedora.com"
                                        required />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">

                                {/* <Form.Label>
                                    Senha
                                    </Form.Label> */}

                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">
                                            <img
                                                src={senha}
                                                width="20em"
                                                height="20em"
                                                alt="Ícone de senha" /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        value={this.state.senha}
                                        onChange={this.atualizaEstadoSenha.bind(this)}
                                        type="password"
                                        placeholder="Insira sua senha"
                                        minLength="6"
                                        maxLength="12"
                                        required />
                                </InputGroup>
                            </Form.Group>

                                <p style={{ color: 'red', fontSize: '0.75em', textAlign: 'center', whiteSpace: 'pre' }}>{this.state.erroMensagem}</p>
                            <Form.Group className="btn-login">
                                <Button type="submit" className="btn" size="lg" variant="primary" >Entrar</Button>
                                {/* href="/funcionalidades" */}
                            </Form.Group>

                        </form>

                    </div>
                </div>
                <Rodape />
            </div>
        );
    }
}
// {/* <input
//                                 placeholder="username"
//                                 type="email"
//                                 value={this.state.email}
//                                 onChange={this.atualizaEstadoEmail.bind(this)}
//                                 name="username"
//                             /><input
//                                 className="input__login"
//                                 placeholder="username"
//                                 type="password"
//                                 value={this.state.senha}
//                                 onChange={this.atualizaEstadoSenha.bind(this)}
//                                 name="password"
//                             />
//                             <p>{this.state.erro}</p>
//                             <button type="submit" >Entrar</button> */}
export default Login;


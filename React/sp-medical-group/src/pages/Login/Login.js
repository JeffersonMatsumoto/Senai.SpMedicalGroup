import React, { Component } from "react";
import {parseJwt} from '../../services/auth.js';
// import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.js';
import Rodape from '../../components/Rodape/Rodape.js';
import { Form, Button } from 'react-bootstrap';
// import LoginBanner from '../../assets/img/Login-banner.jpg';
// import Logo from '../../assets/img/Logo.png'

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
           email : this.state.email,
           senha : this.state.senha
        })

        .then(data => {
            if(data.status === 200){
                // console.log(data);
                localStorage.setItem("user", data.data.token);
                // this.props.history.push("/consultasmedico");
                console.log(parseJwt().Permissao);
                this.props.history.push("/funcionalidades");
                if(parseJwt().Permissao === 'Administrador'){
                    console.log("Teste para aparecer no console");
                    this.props.history.push("/funcionalidades");
                } else if (parseJwt().Permissao === "Médico") {
                    this.props.history.push("/consultasmedicos");
                } else if (parseJwt().Permissao === "Paciente") {
                    this.props.history.push("/consultaspaciente");
                }else {
                    this.props.history.push("/login")
                }
            }
        })
        .catch(erro => {
            this.setState({ erroMensagem : 'Email ou senha inválido'});
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
                                    {/* <img id="img-login" src={Logo} alt="logo-login" /> */}
                                    <h4><b>LOGIN</b></h4>
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                
                                    <Form.Label>
                                        Email
                                    </Form.Label>
                                    
                                    <Form.Control 
                                    value={this.state.email}
                                    onChange={this.atualizaEstadoEmail.bind(this)}
                                    type="email" 
                                    placeholder="exemplo@provedora.com" 
                                    required />

                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">

                                    <Form.Label>
                                        Senha
                                    </Form.Label>
                                    
                                    <Form.Control 
                                    value={this.state.senha}
                                    onChange={this.atualizaEstadoSenha.bind(this)}
                                    type="password" 
                                    placeholder="Insira sua senha..." 
                                    minLength="6"  
                                    maxLength="12" 
                                    required />

                                </Form.Group>

                                <Form.Group className="btn-login">
                                    <p>{this.state.erroMensagem}</p>
                                    <Button  type="submit" className="btn" size="lg" variant="primary" >Entrar</Button>
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


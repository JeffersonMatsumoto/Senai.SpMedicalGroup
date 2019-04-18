import React, { Component } from "react";
// import {parseJwt} from '../../services/auth';
// import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.js';
import Rodape from '../../components/Rodape/Rodape.js';
import { Form, Button } from 'react-bootstrap';
// import LoginBanner from '../../assets/img/Login-banner.jpg';
// import Logo from '../../assets/img/Logo.png'

import "../../assets/css/login.css";

import Axios from "axios";


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

    atualizaEstadoEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }

    efetuaLogin(event) {
        event.preventDefault();
        Axios.post("localhost:3000/api/login", {
           email : this.state.email,
           senha: this.state.senha
        })
        .then(data => {
            if(data.status === 200){
                console.log(data);
                localStorage.setItem("usuario-spmedicalgroup", data.data.token);
                // Verifica o tipo de usuário e redireciona para a página default
        //         console.log(parseJwt().Role);
        //         if(parseJwt().Role == "Administrador"){
        //           this.props.history.push("/eventos/cadastrar");
        //         } else {
                  this.props.history.push("/cadastrar");
        //         }
            } else {
                alert('Email ou senha inválido, por favor tente novamente...')
            }
        //     } 
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
                        <Form id="form-login" onSubmit={this.efetuaLogin.bind(this)}>

                                <Form.Group id="form-title">
                                    {/* <img id="img-login" src={Logo} alt="logo-login" /> */}
                                    <h4><b>LOGIN</b></h4>
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                
                                    <Form.Label
                                    value={this.state.email}
                                    onChange={this.atualizaEstadoEmail.bind(this)}>
                                        Email
                                    </Form.Label>
                                    
                                    <Form.Control type="email" placeholder="exemplo@provedora.com" required />

                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">

                                    <Form.Label
                                    value={this.state.senha}
                                    onChange={this.atualizaEstadoSenha.bind(this)}>
                                        Senha
                                    </Form.Label>
                                    
                                    <Form.Control type="password" placeholder="Insira sua senha..." minLength="6"  maxLength="12" required />

                                </Form.Group>

                                <Form.Group className="btn-login">
                                    <p>{this.state.erroMensegem}</p>
                                    <Button className="btn" size="lg" variant="primary" type="submit">Entrar</Button>

                                </Form.Group>

                        </Form>

                    </div>
                </div>
                <Rodape />
            </div>
        );
    }
}

export default Login;
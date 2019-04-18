import React, { Component } from 'react';
import Axios from "axios";
import { Form, Button } from 'react-bootstrap';

import Header from '../../../components/Header/Header.js';
import Rodape from '../../../components/Rodape/Rodape';

import "../../../assets/css/cadastrar.css";
// https://medium.com/@dnvtrn/como-fazer-um-crud-com-create-react-app-f0402ff89c05

class CadastrarUsuario extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            senha: '',
            idtipousuario: '',
            erroMensagem: ''
        }
    }

    atualizaEstadoEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }

    atualizaEstadoIdTipoUsuario(event) {
        this.setState({ tipousuario: event.target.value })
    }

    cadastraUsuario(event) {
        event.preventDefault();

        Axios.post("http://localhost:5000/api/usuario",
            {
                Email: this.state.email,
                Senha: this.state.senha,
                IdTipoUsuarios: this.state.idtipousuario,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("usuario-spmedicalgroup")
                }
            })
            .then(data => {
                if (data.status === 200) {
                    console.log(data);
                    this.setState({ Mensagem: 'Usuário cadastrado com sucesso!' });
                    if (this.state.tipousuario === "Administrador") {
                        this.props.history.push("/");
                    }
                }
            })
            .catch(erro => {
                this.setState({ Mensagem: 'Insira um email e senha válido' + erro });
            })
    }

    render() {
        return (
            <div>
                <Header></Header>
                <Form className="forms" onSubmit={this.cadastraUsuario.bind(this)}>
                    
                    <h3>Formulário de cadastro de novo usuário</h3>
                    
                    {/* <div>
                        <p>Email: </p>
                        <input type="text" name="email" id="email1" value={this.state.email}
                            onChange={this.atualizaEstadoEmail.bind(this)} />
                    </div> */}

                    {/* <div>
                        <p>Senha:</p>
                        <input type="password" name="senha" id="senha1" value={this.state.senha}
                            onChange={this.atualizaEstadoSenha.bind(this)} />
                    </div> */}

                    {/* <div>
                        <p>Tipo de Usuário:</p>
                        <input type="text" value={this.state.idtipousuario}
                            onChange={this.atualizaEstadoIdTipoUsuario.bind(this)} />
                    </div> */}
                    

                    <Form.Group>
                        <Form.Label>Email:</Form.Label>

                        <Form.Control 
                        type="email" 
                        placeholder="name@example.com"
                        value={this.state.email}
                        onChange={this.atualizaEstadoEmail.bind(this)} />
                    
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Senha:</Form.Label>

                        <Form.Control 
                        type="password"
                        value={this.state.senha}
                        onChange={this.atualizaEstadoSenha.bind(this)}/>

                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Selecione o tipo de usuário (id):</Form.Label>

                        <Form.Control id="tipo-usuario" as="select" 
                        required 
                        // value={this.state.idtipousuario} 
                        onChange={this.atualizaEstadoIdTipoUsuario.bind(this)}
                        >

                            <option value="1" >                         Administrador   </option>
                            <option value="2" >                         Médico          </option>
                            <option value="3" selected="selected" >     Paciente        </option>
                        </Form.Control>

                    </Form.Group>

                    <p>{this.state.erroMensagem}</p>
                    
                    <Button id="btns" type="submit" value="Cadastrar" className="btn" size="lg" variant="primary">Cadastrar</Button>

                </Form>
                
                <Rodape></Rodape>

            </div>
        );
    }
} //https://react-bootstrap.github.io/components/forms/

export default CadastrarUsuario;
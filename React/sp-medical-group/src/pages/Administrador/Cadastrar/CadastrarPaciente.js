import React, { Component } from 'react';
import Axios from "axios";
import { Form, Button, Row, Col } from 'react-bootstrap';

import Header from '../../../components/Header/Header.js';
import Rodape from '../../../components/Rodape/Rodape';

import "../../../assets/css/cadastrar.css";
// https://medium.com/@dnvtrn/como-fazer-um-crud-com-create-react-app-f0402ff89c05

// npm install react-text-mask --save
// import MascaraInput from 'react-text-mask';

class CadastrarPaciente extends Component {

    constructor() {
        super();
        this.state = {
            nome: '',
            rg: '',
            cpf: '',
            datanascimento: '',
            telefone: '',
            idEndereco: '', //talvez seja pelo id...
            idUsuario: '',
            erroMensagem: '',
            listaUsuario: []

        }
    }

    // function formatar(mascara, documento){
    //     var i = documento.value.length;
    //     var saida = mascara.substring(0,1);
    //     var texto = mascara.substring(i)

    //     if (texto.substring(0,1) != saida){
    //               documento.value += texto.substring(0,1);
    //     }
    // }

    componentDidMount() {
        this.buscarUsuarios();
    }

    atualizaEstadoNome(event) {
        this.setState({ nome: event.target.value });
    }

    atualizaEstadoRg(event) {
        this.setState({ rg: event.target.value });
    }

    atualizaEstadoCpf(event) {
        this.setState({ cpf: event.target.value })
    }

    atualizaEstadoDataNascimento(event) {
        this.setState({ datanascimento: event.target.value });
    }

    atualizaEstadoTelefone(event) {
        this.setState({ telefone: event.target.value });
    }

    atualizaEstadoEndereco(event) {
        this.setState({ idEndereco: event.target.value })
    }

    atualizaEstadoUsuario(event) {
        this.setState({ idUsuario: event.target.value })
    }

    buscarUsuarios() {
        fetch('http://localhost:5000/api/usuarios', {
            method: 'GET',
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("user")
            }
        })
            .then(resposta => 
                resposta.json())
            .then(data => 
                this.setState({ listaUsuario: data })
            )
            .catch((erro) => console.log(erro))
    }

    cadastraPaciente(event) {
        event.preventDefault();

        Axios.post("http://localhost:5000/api/prontuarios",
            {
                nomePaciente: this.state.nome,
                rg: this.state.rg,
                cpf: this.state.cpf,
                dataNascimento: this.state.datanascimento,
                telefone: this.state.telefone,
                idEndereco: this.state.idEndereco,
                idUsuario: this.state.idUsuario
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("user")
                }
            })
            .then(data => {
                if (data.status === 200) {
                    console.log(data);
                    this.setState({ Mensagem: 'Paciente cadastrado com sucesso!' });
                    alert('Paciente cadastrado(a) com sucesso! ' + this.state.nome);
                    // if (this.state.tipousuario === "Administrador") {
                    //     this.props.history.push("/");
                    // }
                }
            })
            .catch(erro => {
                this.setState({ Mensagem: 'Por favor, verifique os campos e tente novamente' + erro });
            })
    }

    //https://www.npmjs.com/package/react-input-mask

    render() {
        console.log(this.state.listaUsuario);
        return (

            <div>
                <Header></Header>
                <Form className="forms" onSubmit={this.cadastraPaciente.bind(this)}>

                    <h3>Formulário de cadastro de paciente</h3>

                    {/* 
                    <Row>
                        <Col>
                            <Form.Control placeholder="First name" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Last name" />
                        </Col>
                    </Row> 
                    */}

                    <Form.Group>
                        <Form.Label>Nome:</Form.Label>

                        <Form.Control
                            className="input-ajustado"
                            type="text"
                            value={this.state.nome}
                            required
                            onChange={this.atualizaEstadoNome.bind(this)} />

                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Rg:</Form.Label>

                                <Form.Control
                                    className="input-ajustado"
                                    type="text"
                                    value={this.state.rg}
                                    minlength="9"
                                    maxlength="9"
                                    required
                                    onChange={this.atualizaEstadoRg.bind(this)} />

                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Cpf:</Form.Label>

                                {/* <MascaraInput mask={['(',/[1-9]/,/[1-9]/,')', ' ' , /[1-9]/,/[1-9]/,/[1-9]/,/[1-9]/, ' ', '-' , ' ', /[1-9]/,/[1-9]/,/[1-9]/,/[1-9]/]} guide={true} showMask={true} > */}
                                {/* </MascaraInput> */}
                                <Form.Control
                                    className="input-ajustado"
                                    type="text"
                                    value={this.state.cpf}
                                    minLength="11"
                                    maxLength="11"
                                    required
                                    onChange={this.atualizaEstadoCpf.bind(this)} />


                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Data de nascimento:</Form.Label>

                                <Form.Control
                                    id="data-nascimento"
                                    type="date"
                                    value={this.state.datanascimento}
                                    required
                                    onChange={this.atualizaEstadoDataNascimento.bind(this)} />

                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Telefone:</Form.Label>

                                <Form.Control
                                    id="telefone"
                                    className="input-ajustado"
                                    type="tel"
                                    value={this.state.telefone}
                                    // pattern="[0-9]{2} [0-9]{4}-[0-9]{4}"
                                    placeholder="Ex. (11) 1234-5678"
                                    required
                                    onChange={this.atualizaEstadoTelefone.bind(this)} />

                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Endereço (id):</Form.Label>

                        <Form.Control
                            className="input-ajustado"
                            type="text"
                            value={this.state.idEndereco}
                            required
                            onChange={this.atualizaEstadoEndereco.bind(this)} />

                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Usuario (id):</Form.Label>

                        <Form.Control
                            className="input-ajustado"
                            type="text"
                            value={this.state.idUsuario}
                            required
                            as="select"
                            onChange={this.atualizaEstadoUsuario.bind(this)}
                        >
                            {
                                this.state.listaUsuario.map(function (i) {

                                    return (
                                        <option key={i.id} value={i.id}> {i.email} </option>
                                    );

                                })
                            }
                        </Form.Control>

                        </Form.Group>

                        {/* <Form.Group>
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

                    </Form.Group> */}

                        <p>{this.state.erroMensagem}</p>

                        <div className="flex-btns">
                    <Button href="/funcionalidades" id="btns" className="btn" size="lg" variant="primary">Voltar </Button>
                    <Button id="btns" type="submit" value="Cadastrar" className="btn" size="lg" variant="primary">Cadastrar</Button>
                    </div>

                </Form>

                    <Rodape></Rodape>

            </div>
                );
            }
        } //https://react-bootstrap.github.io/components/forms/
        
export default CadastrarPaciente;
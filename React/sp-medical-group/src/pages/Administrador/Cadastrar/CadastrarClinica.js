import React, { Component } from 'react';
import Axios from "axios";
import { Form, Button, Row, Col } from 'react-bootstrap';

import Header from '../../../components/Header/Header.js';
import Rodape from '../../../components/Rodape/Rodape';

import "../../../assets/css/cadastrar.css";

class CadastrarClinica extends Component {

    constructor() {
        super();
        this.state = {
            nomefantasia: '',
            razaosocial: '',
            cnpj: '',
            horariofuncionamento: '',
            endereco: '',
            erroMensagem: ''
        }
    }

    atualizaEstadoNomeFantasia(event) {
        this.setState({ nomefantasia: event.target.value });
    }

    atualizaEstadoRazaoSocial(event) {
        this.setState({ razaosocial: event.target.value });
    }

    atualizaEstadoCnpj(event) {
        this.setState({ cnpj: event.target.value })
    }

    atualizaEstadoHorarioFuncionamento(event) {
        this.setState({ horariofuncionamento: event.target.value });
    }

    atualizaEstadoEndereco(event) {
        this.setState({ endereco: event.target.value });
    }

    cadastraClinica(event) {
        event.preventDefault();

        Axios.post("http://localhost:5000/api/clinicas",
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
                    this.setState({ Mensagem: 'Clínica cadastrada com sucesso!' });
                    if (this.state.tipousuario === "Administrador") {
                        this.props.history.push("/");
                    }
                }
            })
            .catch(erro => {
                this.setState({ Mensagem: 'Por favor, verifique os campos e tente novamente' + erro });
            })
    }

    render() {
        return (
            <div>
                <Header></Header>
                <Form className="forms" onSubmit={this.cadastraClinica.bind(this)}>

                    <h3>Formulário de cadastro de clínicas</h3>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Nome Fantasia:</Form.Label>

                                <Form.Control
                                    className="input-ajustado"
                                    type="text"
                                    value={this.state.nomefantasia}
                                    required
                                    onChange={this.atualizaEstadoNomeFantasia.bind(this)} />

                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Razão Social:</Form.Label>

                                <Form.Control
                                    className="input-ajustado"
                                    type="text"
                                    value={this.state.razaosocial}
                                    required
                                    onChange={this.atualizaEstadoRazaoSocial.bind(this)} />


                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Horário de funcionamento:</Form.Label>

                                <Form.Control
                                    value={this.state.horariofuncionamento}
                                    required
                                    onChange={this.atualizaEstadoHorarioFuncionamento.bind(this)} />

                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Cnpj:</Form.Label>

                                <Form.Control
                                    className="input-ajustado"
                                    type="text"
                                    minLength="14"
                                    maxLength="14"
                                    value={this.state.cnpj}
                                    required
                                    onChange={this.atualizaEstadoCnpj.bind(this)}>

                                </Form.Control>

                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Endereço:</Form.Label>

                        <Form.Control
                            type="text"
                            value={this.state.endereco}
                            required
                            onChange={this.atualizaEstadoEndereco.bind(this)}>
                            
                            </Form.Control>

                    </Form.Group>

                    <p>{this.state.erroMensagem}</p>

                    <Button id="btns" type="submit" value="Cadastrar" className="btn" size="lg" variant="primary">Cadastrar</Button>

                </Form>

                <Rodape></Rodape>

            </div>
        );
    }
}

export default CadastrarClinica;
import React, { Component } from 'react';
import Axios from "axios";
import { Form, Button, Row, Col } from 'react-bootstrap';

import Header from '../../../components/Header/Header.js';
import Rodape from '../../../components/Rodape/Rodape';

import "../../../assets/css/cadastrar.css";

//Run `npm install node-sass`
// import "../../../assets/css/teste.scss";

class CadastrarConsulta extends Component {

    constructor() {
        super();
        this.state = {
            medico: '',
            paciente: '',
            dataconsulta: '',
            descricao: '',
            situacao: '',
            erroMensagem: ''
        }
    }

    atualizaEstadoMedico(event) {
        this.setState({ medico: event.target.value });
    }

    atualizaEstadoPaciente(event) {
        this.setState({ paciente: event.target.value });
    }

    atualizaEstadoDataConsulta(event) {
        this.setState({ dataconsulta: event.target.value })
    }

    atualizaEstadoDescricao(event) {
        this.setState({ descricao: event.target.value });
    }

    atualizaEstadoSituacao(event) {
        this.setState({ situacao: event.target.value });
    }

    cadastraConsulta(event) {
        event.preventDefault();

        Axios.post("http://localhost:5000/api/consultas",
            {
                Email: this.state.email,
                Senha: this.state.senha,
                IdTipoUsuarios: this.state.idtipousuario,
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
                    this.setState({ Mensagem: 'Consulta cadastrada com sucesso!' });
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
                <Form className="forms" onSubmit={this.cadastraConsulta.bind(this)}>

                    <h3>Formulário de cadastro de consultas</h3>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Médico:</Form.Label>

                                <Form.Control
                                    className="input-ajustado"
                                    type="text"
                                    value={this.state.medico}
                                    required
                                    onChange={this.atualizaEstadoMedico.bind(this)} />

                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Paciente:</Form.Label>

                                <Form.Control
                                    className="input-ajustado"
                                    type="text"
                                    value={this.state.paciente}
                                    required
                                    onChange={this.atualizaEstadoPaciente.bind(this)} />


                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Data da consulta:</Form.Label>

                                <Form.Control
                                    id="data-consulta"
                                    type="datetime-local"
                                    value={this.state.dataconsulta}
                                    required
                                    onChange={this.atualizaEstadoDataConsulta.bind(this)} />

                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Situação:</Form.Label>

                                <Form.Control
                                    id="situacao"
                                    as ="select"
                                    className="input-ajustado"
                                    type="text"
                                    value={this.state.situacao}
                                    required
                                    onChange={this.atualizaEstadoSituacao.bind(this)}>
                                        <option value="Agendado" selected="selected">       Agendado   </option>
                                        <option value="Cancelado">                          Cancelado          </option>
                                        <option value="Realizado">                          Realizado        </option>

                                </Form.Control>

                            {/* //('Agendado'),('Cancelado'),('Realizado') */}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Descrição:</Form.Label>

                        <textarea
                            className="descricao"
                            type="text"
                            value={this.state.descricao}
                            required
                            onChange={this.atualizaEstadoDescricao.bind(this)}>
                            
                            </textarea>

                    </Form.Group>

                    <p>{this.state.erroMensagem}</p>

                    <Button id="btns" type="submit" value="Cadastrar" className="btn" size="lg" variant="primary">Cadastrar</Button>

                </Form>

                <Rodape></Rodape>

            </div>
        );
    }
}

export default CadastrarConsulta;
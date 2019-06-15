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
            erroMensagem: '',
            listaPaciente: [],
            listaMedico: []
        }
    }

    componentDidMount() {
        this.buscarPacientes();
        this.buscarMedicos();
    }

    buscarPacientes() {
        fetch('http://localhost:5000/api/prontuarios', {
            method: 'GET',
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("user")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaPaciente: data }))
            .catch((erro) => console.log(erro))
    }

    buscarMedicos() {
        fetch('http://localhost:5000/api/medicos', {
            method: 'GET',
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("user")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaMedico: data }))
            .catch((erro) => console.log(erro))
    }

    atualizaEstadoMedico(event) {
        this.setState({ medico: event.target.value });
    }

    atualizaEstadoPaciente(event) {
        // console.log(event.target.value)
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

        if (this.state.situacao === '' || this.state.situacao === null ) {
            alert("O campo *SITUAÇÃO* está vazio");
            event.preventDefault();
        } else if (this.state.paciente === '' || this.state.paciente === null ) {
            alert("O campo *PACIENTE* está vazio");
            event.preventDefault();
        } else if (this.state.medico === '' || this.state.medico === null ) {
            alert("O campo *MÉDICO* está vazio");
            event.preventDefault();
        } else if (this.state.dataconsulta === '' || this.state.dataconsulta === null ) {
            alert("O campo *DATA DA CONSULTA* está vazio");
            event.preventDefault();
        } else if ( this.state.descricao === '' || this.state.descricao === null) {
            alert("O campo *DESCRIÇÃO* está vazio");
            event.preventDefault();
        } else {
        event.preventDefault();
        const dados = {
            idMedico: this.state.medico,
            idProntuario: this.state.paciente,
            DataConsulta: this.state.dataconsulta,
            Descricao: this.state.descricao,
            idSituacao: this.state.situacao
        }
        console.log(dados)
        Axios.post("http://localhost:5000/api/consultas",
            dados
            ,
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
                    this.limparForm();
                    alert('Consulta cadastrada com sucesso!');
                    // if (this.state.tipousuario === "Administrador") {
                    //     this.props.history.push("/funcionalidades");
                    // }
                }
            })
            .catch(erro => {
                console.error(erro)
                this.setState({ Mensagem: 'Por favor, verifique os campos e tente novamente' + erro });
            })
        }
    }

    limparForm() {
        this.setState(
            {
                medico: '',
                paciente: '',
                dataconsulta: '',
                descricao: '',
                situacao: ''
            }
        )
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
                                    as="select"
                                    onChange={this.atualizaEstadoMedico.bind(this)}>
                                        <option 
                                        // selected
                                        defaultValue
                                        value></option>
                                    {
                                        this.state.listaMedico.map(function (m) {

                                            return (
                                                <option key={m.id} value={m.id}> {m.nome} </option>
                                            );

                                        })
                                    }
                                </Form.Control>

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
                                    as="select"
                                    onChange={this.atualizaEstadoPaciente.bind(this)}
                                >
                                    <option 
                                    // selected 
                                    defaultValue
                                    value></option>
                                    {
                                        this.state.listaPaciente.map(function (i) {

                                            return (
                                                <option key={i.id} value={i.id}> {i.nomePaciente} </option>
                                            );

                                        })
                                    }
                                </Form.Control>

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
                                    as="select"
                                    className="input-ajustado"
                                    type="text"
                                    value={this.state.situacao}
                                    required
                                    onChange={this.atualizaEstadoSituacao.bind(this)}>
                                    {/* <option value="" selected="selected"></option> */}
                                    <option value="1" 
                                    // selected="selected"
                                    defaultValue
                                    >       Agendado   </option>
                                    <option value="2">                          Cancelado          </option>
                                    <option value="3">                          Realizado        </option>

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

                    <div className="flex-btns">
                        <Button href="/funcionalidades" id="btns" className="btn" size="lg" variant="primary">Voltar </Button>
                        <Button id="btns" type="submit" value="Cadastrar" className="btn" size="lg" variant="primary">Cadastrar</Button>
                    </div>

                </Form>

                <Rodape></Rodape>

            </div>
        );
    }
}

export default CadastrarConsulta;
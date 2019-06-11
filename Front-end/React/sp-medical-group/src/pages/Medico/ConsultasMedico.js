//Uma única pagina para listar as consultas do medico e add descrição

//lista as consultas do paciente já que é a unica funcionalidade para ele

// componentDidMount() {
//     axios.get(`https://localhost:5000/api/consultas`)
//         .then(res => )
// }

// https://github.com/Microsoft/vscode/issues/46462

import React, { Component } from 'react';
import Axios from "axios";
import { Table, Button, FormControl, Form } from 'react-bootstrap';

import Header from '../../components/Header/Header';
import Rodape from '../../components/Rodape/Rodape';

class ListarConsultaMedico extends Component {

    constructor() {
        super();
        this.state = {
            id: '',

            paciente: '',
            medico: '',
            dataconsulta: '',

            descricao: '',
            situacao:'',
            listaConsulta: []
        }
    }

    componentDidMount() {
        this.listarconsultas();
    }

    listarconsultas() {

        // var bearer = 'Bearer ' + localStorage.getItem("user");

        Axios.get("http://localhost:5000/api/consultas",
            {
                headers: {
                    'Content-Type': 'application/json', Charset: 'UTF-8',
                    'Authorization': "Bearer " + localStorage.getItem("user")
                }
            })
            .then((response) => {
                console.log(response);
                response = this.setState({ listaConsulta: response.data })
            })
            .catch((erro) => console.log(erro))
    }

    atualizaEstadoId(event) {
        this.setState(
            { 
                id: event.target.value ,
                paciente: '',
                medico: '',
                dataconsulta: '',
                descricao: '',
                situacao:'',
            }
        )
    }

    atualizaEstadoDescricao(event) {
        this.setState({ descricao: event.target.value })
    }

    atualizaEstadoSituacao(event) {
        this.setState({ situacao: event.target.value })
    }

    editarconsultas(event) {
        event.preventDefault();

        Axios.put("http://localhost:5000/api/consultas",
            {
                id: this.state.id,
                // descricao: this.state.descricao,
                idMedico: this.state.medico,
                idProntuario: this.state.paciente,
                DataConsulta: this.state.dataconsulta,
                Descricao: this.state.descricao,
                idSituacao: this.state.situacao 
                // situacao: this.state.situacao
            },

            {

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("user")
                }

            })

            .then(data => {
                if (data.status === 200) {
                    this.setState({ Mensagem: 'Atualização bem sucedido.' });
                    alert('Descrição adicionada com sucesso!');
                }
            })

            .catch(erro => {
                this.setState({ Mensagem: 'Há informações inválidas, verifique e tente novamente.' + erro });
            })
    }


    // componentDidMount() {
    //     this.buscarConsultas();
    // }
    // buscarConsultas() {
    //     fetch('http://localhost:5000/api/consultas',{
    //         method:'GET',
    //         headers:
    //     {
    //         "Content-Type":"application/json",
    //         "Authorization": "Bearer " + localStorage.getItem("user")
    //     }
    // })
    //         .then(resposta => resposta.json())
    //         .then(data => this.setState({ listaConsulta: data }))
    //         .catch((erro) => console.log(erro))
    // }



    render() {
        return (
            <div>
                <Header></Header>
                <div style={{ padding: '10%' }}>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                {/* <th>Médico</th> */}

                                <th>Id</th>

                                <th>Paciente</th>
                                <th>Data consulta</th>

                                {/* em breve transformar em um botao q ao clicar exibe um modal com a descricao */}
                                <th>Adicionar descrição</th>

                                <th>Situação</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.listaConsulta.map(function (consulta) {
                                    return (
                                        <tr key={consulta.id}>
                                            {/* <td>{consulta.idMedico}</td> */}

                                            <td>{consulta.id}</td>

                                            <td>{consulta.idProntuario}</td>
                                            <td>{consulta.dataConsulta.split("T")[0]}</td>

                                            <td>{consulta.descricao}</td>

                                            <td>{consulta.idSituacao}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>

                    </Table>

                    <p>Selecione o Id da consulta que deseja adicionar uma descrição ou alterar o status:</p>
                    <Form style={{ display: 'flex' }} onSubmit={this.editarconsultas.bind(this)}>
                        <select style={{ padding: '.2em', borderRadius: '10%' }} value={this.state.id} name="consulta"
                            onChange={this.atualizaEstadoId.bind(this)} required>
                            {
                                this.state.listaConsulta.map(function (consulta) {
                                    return (
                                        <option key={consulta.id} value={consulta.id}>
                                            {consulta.id}
                                        </option>
                                    );
                                })
                            }
                        </select>
                        <FormControl style={{ width: '55%', marginLeft: '1em' }} type="text" value={this.state.descricao} onChange={this.atualizaEstadoDescricao.bind(this)} />
                        <FormControl style={{ width: '15%', marginLeft: '1em' }} required as='select' type="text" value={this.state.situacao} onChange={this.atualizaEstadoSituacao.bind(this)} >
                            <option value='1'>Agendado</option>
                            <option value='3'>Realizado</option>
                            <option value='2'>Cancelado</option>
                        </FormControl>
                        <Button type="submit" style={{ width: '25%', marginLeft: '1em' }} 
                            // onClick={this.editarconsultas.bind(this)}
                        >Adicionar / Alterar descrição</Button>
                    </Form>

                    {/* <textarea value={this.state.descricao} onChange={(e) => this.setState({ descricao: e.target.value })} />
                        <button onClick={this.editaConsulta.bind(this)}>Alterar descrição</button> */}

                    {/* onClick cm permissao? */}
                    {/* <Button href="/" id="btns"  className="btn" size="lg" variant="primary">
                    Voltar
                </Button> */}
                </div>
                <Rodape></Rodape>
                {/* </div> */}
            </div>
        );
    }
}

export default ListarConsultaMedico;
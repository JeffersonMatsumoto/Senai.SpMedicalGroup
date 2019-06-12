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
            situacao: '',
            listaConsulta: [],
            listaPaciente: []
        }
    }

    componentDidMount() {
        this.listarconsultas();
        this.buscarPacientes();
    }

    buscarPacientes() {
        fetch('http://localhost:5000/api/prontuarios', {
            method:'GET',
            headers:
        {
            "Content-Type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem("user")
        }
    })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaPaciente: data }))
            .catch((erro) => console.log(erro))
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
                id: event.target.value
            }
        )
        //
        ///
        //
        //
        // this.setState({medico: Consulta.idMedico})
    }

    atualizaEstadoDescricao(event) {
        this.setState({ descricao: event.target.value })
    }

    atualizaEstadoPaciente(event) {
        this.setState({ paciente: event.target.value })
    }

    atualizaEstadoMedico(event) {
        this.setState({ medico: event.target.value })
    }

    atualizaEstadoSituacao(event) {
        console.log('passei aqui')
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
                    <Form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={this.editarconsultas.bind(this)}>

                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <select style={{ height: '1%', padding: '1%', marginRight: '1%', borderRadius: '3%' }} value={this.state.id} name="consulta"
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
                            
                        </div>
                            <label style={{ marginTop: '1%' }}>Selecione o status da consulta:</label>
                            <select value={this.state.situacao}
                                onChange={this.atualizaEstadoSituacao.bind(this)}
                                style={{ height: '1%', padding: '1%', borderRadius: '3%', width: '20%' }}
                            >
                                {/* <option defaultChecked></option> */}
                                <option value='1'>Agendado</option>
                                <option value='3'>Realizado</option>
                                <option value='2'>Cancelado</option>
                            </select>

                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1%', marginBottom: '1%' }}>

                            {/* <div style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between'}}> */}
                                
                                <label>Informe o id do médico ( 1 = Ricardo Lemos / 2 = Roberto Possarle / 3 = Helena Strada ):</label>
                                <FormControl style={{ width: '20%' }} type="text"
                                    placeholder="Insira o id do médico"
                                    value={this.state.medico}
                                    onChange={this.atualizaEstadoMedico.bind(this)}
                                />

                                <label style={{ marginTop: '1%' }}>Selecione um paciente:</label>
                                <FormControl style={{ width: '20%' }} 
                                    // type="text"
                                    // placeholder="Insira o id do paciente"
                                    // value={this.state.paciente}
                                    // onChange={this.atualizaEstadoPaciente.bind(this)}
                                    type="text"
                                    value={this.state.paciente}
                                    required
                                    as="select"
                                    onChange={this.atualizaEstadoPaciente.bind(this)} 
                                >
                                    {
                                        this.state.listaPaciente.map(function (i) {
                                            
                                            return (
                                                <option key={i.id} value={i.id}> {i.nomePaciente} </option>
                                            );
        
                                        })
                                    }
                                </FormControl>

                            {/* </div> */}

                            <textarea style={{ width: '100%', marginTop:'1%',resize: 'none', padding: '.375rem .75rem' }} 
                                type="text"
                                cols="30" rows="5"
                                placeholder="Insira uma descrição"
                                value={this.state.descricao}
                                onChange={this.atualizaEstadoDescricao.bind(this)}
                            />
                        </div>
                        {/* <FormControl style={{ width: '15%', marginLeft: '1em' }} required as='select' type="text"
                            value={this.state.situacao}
                            onChange={this.atualizaEstadoSituacao.bind(this)}
                        >
                            <option value='1'>Agendado</option>
                            <option value='3'>Realizado</option>
                            <option value='2'>Cancelado</option>
                        </FormControl> */}



                        <Button type="submit" style={{ width: '25%', alignSelf: 'center' }}
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
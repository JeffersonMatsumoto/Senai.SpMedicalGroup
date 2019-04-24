// https://tech.amikelive.com/node-830/reactjs-changing-default-port-3000-in-create-react-app/

// no package.json

import React, { Component } from 'react';
// import Axios from "axios";
import { Table, Button } from 'react-bootstrap';

import Header from '../../../components/Header/Header.js';
import Rodape from '../../../components/Rodape/Rodape';

class ListarPaciente extends Component {

    constructor() {
        super();
        this.state = {
            listaPaciente: []
        }
    }
    
    componentDidMount() {
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



    render() {
        return (
            <div >
                <Header></Header>
                <div style={{ padding: '10%' }}>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Rg</th>
                                <th>Cpf</th>

                                {/* em breve transformar em um botao q ao clicar exibe um modal com a descricao */}
                                <th>Data de nascimento</th>

                                <th>Telefone</th>

                                <th>Endereço</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.listaPaciente.map(function (paciente) {
                                    return (
                                        <tr key={paciente.id}>
                                            <td>{paciente.nomePaciente}</td>
                                            <td>{paciente.rg}</td>
                                            <td>{paciente.cpf}</td>
                                            <td>{paciente.dataNascimento}</td>
                                            <td>{paciente.telefone}</td>
                                            <td>{paciente.idEndereco}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>

                    {/* onClick cm permissao? */}
                    <Button href="/funcionalidades" id="btns" className="btn" size="lg" variant="primary">
                        Voltar
                </Button>
                </div>
                <Rodape></Rodape>
                {/* </div> */}
            </div>
        );
    }
} //https://react-bootstrap.github.io/components/forms/

export default ListarPaciente;
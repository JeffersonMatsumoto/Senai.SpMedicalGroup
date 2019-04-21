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

    buscarPacientes() {
        fetch('http://localhost:5000/api/prontuarios')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaPaciente: data }))
            .catch((erro) => console.log(erro))
    }

    componentDidMount() {
        this.buscarPacientes();
    }

    render() {
        return (
            <div style={{ padding : '10%' }}>
                <Header></Header>

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
                            this.state.listaPaciente.map(function(paciente) {
                                return (
                                    <tr key={paciente.id}>
                                        <td>{paciente.nome}</td>
                                        <td>{paciente.rg}</td>
                                        <td>{paciente.cpf}</td>
                                        <td>{paciente.datanascimento}</td>
                                        <td>{paciente.telefone}</td>
                                        <td>{paciente.endereco}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
                
                {/* onClick cm permissao? */}
                <Button href="/" id="btns"  className="btn" size="lg" variant="primary">
                    Voltar
                </Button>

                <Rodape></Rodape>
                {/* </div> */}
            </div>
        );
    }
} //https://react-bootstrap.github.io/components/forms/

export default ListarPaciente;
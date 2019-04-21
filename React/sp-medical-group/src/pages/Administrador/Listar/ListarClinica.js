import React, { Component } from 'react';
// import Axios from "axios";
import { Table, Button } from 'react-bootstrap';

import Header from '../../../components/Header/Header.js';
import Rodape from '../../../components/Rodape/Rodape';



class ListarClinica extends Component {

    constructor() {
        super();
        this.state = {
            listaClinicas: []
        }
    }

    buscarClinicas() {
        fetch('http://localhost:3000/api/clinicas')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaClinicas: data }))
            .catch((erro) => console.log(erro))
    }

    componentDidMount() {
        this.buscarClinicas();
    }

    // cadastraUsuario(event) {
    //     event.preventDefault();

    //     Axios.get("http://localhost:5000/api/clinicas",
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": "Bearer " + localStorage.getItem("usuario-spmedicalgroup")
    //             }
    //         })
    //         .then(resposta => resposta)
    //         .then(this.buscarClinicas())
    //         .catch(erro => console.log(erro))
    // }

    render() {
        return (
            <div style={{ padding : '10%' }}>
                <Header></Header>

                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Nome Fantasia</th>
                            <th>Razão Social</th>
                            <th>Cnpj</th>
                            <th>Horário Funcionalidades</th>
                            <th>Endereço</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.listaClinicas.map(function(clinica) {
                                return (
                                    <tr key={clinica.id}>
                                        <td>{clinica.nomefantasia}</td>
                                        <td>{clinica.razaosocial}</td>
                                        <td>{clinica.cnpj}</td>
                                        <td>{clinica.horariofuncionamento}</td>
                                        <td>{clinica.endereco}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
                
                {/* onClick cm permissao? */}
                <Button href="/funcionalidades" id="btns"  className="btn" size="lg" variant="primary">
                    Voltar
                </Button>

                <Rodape></Rodape>
                {/* </div> */}
            </div>
        );
    }
} //https://react-bootstrap.github.io/components/forms/

export default ListarClinica;
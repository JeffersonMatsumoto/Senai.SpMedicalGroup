import React, { Component } from 'react';
import Axios from "axios";
import { Table, Button } from 'react-bootstrap';

import Header from '../../../components/Header/Header.js';
import Rodape from '../../../components/Rodape/Rodape';



class CadastrarUsuario extends Component {

    constructor() {
        super();
        this.state = {
            listaClinicas: []
        }
    }

    buscarClinicas() {
        fetch('http://localhost:5000/api/clinicas')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaClinicas: data }))
            .catch((erro) => console.log(erro))
    }

    componentDidMount() {
        this.buscarClinicas();
    }

    cadastraUsuario(event) {
        event.preventDefault();

        Axios.get("http://localhost:5000/api/clinicas",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("usuario-spmedicalgroup")
                }
            })
            .then(resposta => resposta)
            .then(this.buscarClinicas())
            .catch(erro => console.log(erro))
    }

    render() {
        return (
            <div>
                <Header></Header>

                <table>
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
                </table>

                <Button href="/funcionalidades" id="btns" type="submit" value="Cadastrar" className="btn" size="lg" variant="primary">
                    Retornar
                </Button>

                <Rodape></Rodape>
            </div>
        );
    }
} //https://react-bootstrap.github.io/components/forms/

export default CadastrarUsuario;
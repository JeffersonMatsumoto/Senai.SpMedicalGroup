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

    componentDidMount() {
        this.buscarClinicas();
    }

    buscarClinicas() {
        fetch('http://localhost:5000/api/clinicas',{
            method:'GET',
            headers:
        {
            "Content-Type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem("user")
        }
    })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaClinicas: data }))
            .catch((erro) => console.log(erro))
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
            <div >
                <Header></Header>
                <div style={{ padding : '10%', minHeight: '100vh' }}>
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
                                    // TEM Q SER QUE NEM ESTA NO POSTMAN
                                    <tr key={clinica.id}>
                                        <td>{clinica.nomeFantasia}</td>
                                        <td>{clinica.razaoSocial}</td>
                                        <td>{clinica.cnpj}</td>
                                        <td>{clinica.horarioFuncionamento}</td>
                                        <td>{clinica.idEndereco}</td>
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
                </div>
                <Rodape></Rodape>
                {/* </div> */}
            </div>
        );
    }
} //https://react-bootstrap.github.io/components/forms/

export default ListarClinica;
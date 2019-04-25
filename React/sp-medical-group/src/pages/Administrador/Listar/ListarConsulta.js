import React, { Component } from 'react';
// import Axios from "axios";
import { Table, Button } from 'react-bootstrap';

import Header from '../../../components/Header/Header.js';
import Rodape from '../../../components/Rodape/Rodape';

class ListarConsulta extends Component {

    constructor() {
        super();
        this.state = {
            listaConsulta: []
        }
    }
    componentDidMount() {
        this.buscarConsultas();
    }
    buscarConsultas() {
        fetch('http://localhost:5000/api/consultas',{
            method:'GET',
            headers:
        {
            "Content-Type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem("user")
        }
    })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaConsulta: data }))
            .catch((erro) => console.log(erro))
    }



    render() {
        return (
            <div>
                <Header></Header>
                <div  style={{ padding : '10%' }}>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Médico</th>
                            <th>Paciente</th>
                            <th>Data consulta</th>

                            {/* em breve transformar em um botao q ao clicar exibe um modal com a descricao */}
                            <th>Descrição</th> 
                            
                            <th>Situação</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.listaConsulta.map(function(consulta) {
                                return (
                                    <tr key={consulta.id}>
                                        <td>{consulta.idMedico}</td>
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

export default ListarConsulta;
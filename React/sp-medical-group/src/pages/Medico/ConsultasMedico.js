//Uma única pagina para listar as consultas do medico e add descrição

//lista as consultas do paciente já que é a unica funcionalidade para ele

// componentDidMount() {
//     axios.get(`https://localhost:5000/api/consultas`)
//         .then(res => )
// }

import React, { Component } from 'react';
import Axios from "axios";
import { Table } from 'react-bootstrap';

import Header from '../../components/Header/Header';
import Rodape from '../../components/Rodape/Rodape';

class ListarConsultaMedico extends Component {

    constructor() {
        super();
        this.state = {
            listaConsulta: []
        }
    }    
    
    componentDidMount(){
        this.listarconsultas();
    }
    listarconsultas(){

        // var bearer = 'Bearer ' + localStorage.getItem("user");

        Axios.get("http://localhost:5000/api/consultas", 
        {
            headers: {
                'Content-Type' : 'application/json', Charset : 'UTF-8',
                'Authorization' : "Bearer " + localStorage.getItem("user")
            }
        })
        .then((response) => {
            console.log(response);
            response = this.setState({ listaConsulta : response.data })
        })
        .catch((erro) => console.log(erro))  
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
                <div  style={{ padding : '10%' }}>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            {/* <th>Médico</th> */}
                            <th>Paciente</th>
                            <th>Data consulta</th>

                            {/* em breve transformar em um botao q ao clicar exibe um modal com a descricao */}
                            <th>Adicionar descrição</th> 
                            
                            <th>Situação</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.listaConsulta.map(function(consulta) {
                                return (
                                    <tr key={consulta.id}>
                                        {/* <td>{consulta.idMedico}</td> */}
                                        <td>{consulta.idProntuario}</td>
                                        <td>{consulta.dataConsulta}</td>
                                        <td>{consulta.descricao}</td>
                                        <td>{consulta.idSituacao}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
                
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
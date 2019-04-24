// https://tech.amikelive.com/node-830/reactjs-changing-default-port-3000-in-create-react-app/

// no package.json

import React, { Component } from 'react';
// import Axios from "axios";
import { Table, Button } from 'react-bootstrap';

import Header from '../../../components/Header/Header.js';
import Rodape from '../../../components/Rodape/Rodape';

class ListarUsuario extends Component {

    constructor() {
        super();
        this.state = {
            listaUsuario: []
        }
    }
    
    componentDidMount() {
        this.buscarUsuarios();
    }

    buscarUsuarios() {
        fetch('http://localhost:5000/api/usuarios', {
            method: 'GET',
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("user")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaUsuario: data }))
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
                                <th>Email</th>
                                <th>Senha</th>
                                <th>Tipo usuário</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.listaUsuario.map(function (usuario) {
                                    return (
                                        <tr key={usuario.id}>
                                            <td>{usuario.email}</td>
                                            <td>{usuario.senha}</td>
                                            <td>{usuario.idTipoUsuario}</td>
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

export default ListarUsuario;
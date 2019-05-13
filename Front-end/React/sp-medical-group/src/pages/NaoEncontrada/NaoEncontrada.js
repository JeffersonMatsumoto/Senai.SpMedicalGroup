import React, { Component } from "react";
// import Rodape from '../../components/Rodape/Rodape.js'
import { Button } from 'react-bootstrap';
import "../../../src/assets/css/naoencontrada.css"
import  { Link } from 'react-router-dom'

class NaoEncontrada extends Component {
    render() {
        return (
            <div id="container-notfound">
                <div className="notfound">
                    <h1 id="h1-notfound">
                        <b>Erro 404</b> - Página não encontrada.
                    </h1>
                    <Link to="/">
                        <Button id="btn-naoencontrada" variant="outline-primary"> Ir para página principal</Button>
                    </Link>
                </div>
                {/* <Rodape style={{ 'position' : 'fixed' }}/> */}
            </div>
        );
    }
}

export default NaoEncontrada;
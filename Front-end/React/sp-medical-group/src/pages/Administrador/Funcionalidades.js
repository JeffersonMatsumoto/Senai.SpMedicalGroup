//pagina responsavel em redirecionar o ADM para suas funçoes (cadastro/listas)

//inspiracao https://www.awwwards.com/sites/fl-hospital-nicholson-center
import React, { Component } from 'react';

import Header from '../../components/Header/Header.js';
import Rodape from '../../components/Rodape/Rodape.js';

import "../../assets/css/funcionalidades.css";

import { Button } from 'react-bootstrap';

// https://fontawesome.com/how-to-use/on-the-web/using-with/react

// npm i --save @fortawesome/fontawesome-svg-core
// npm i --save @fortawesome/free-solid-svg-icons
// npm i --save @fortawesome/react-fontawesome

// Then in your app, import and add an icon to the Library:
// ERA NO APP.JS MAS...

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faPlusSquare, faClipboardList } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel)
library.add(faPlusSquare)
library.add(faClipboardList)


class Funcionalidades extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
          <div id="container-funcionalidades">
            <h1 id="h1-func">Funcionalidades</h1>

            <div id="funcionalidades-grid">
            <div id="cadastros">
              <h3>Cadastros</h3>
              <div className="funcionalidade-item">
                <Button href="/clinicas" className="btn-funcionalidade" variant="outline-info">
                  <FontAwesomeIcon className="icon-funcionalidade" style={{ color: '' }} icon="plus-square" />
                  <p id="p-btn">Cadastro de Clínicas</p>
                </Button>
              </div>

              <div className="funcionalidade-item">
                <Button href="/usuarios" className="btn-funcionalidade" variant="outline-info">
                  <FontAwesomeIcon className="icon-funcionalidade" style={{ color: '' }} icon="plus-square" />
                  <p id="p-btn">Cadastro de Usuários</p>
                </Button>
              </div>

              <div className="funcionalidade-item">
                <Button href="/prontuarios" className="btn-funcionalidade" variant="outline-info">
                  <FontAwesomeIcon className="icon-funcionalidade" style={{ color: '' }} icon="plus-square" />
                  <p id="p-btn">Cadastro de Pacientes</p>
                </Button>
              </div>

              <div className="funcionalidade-item">
                <Button href="/consultas" className="btn-funcionalidade" variant="outline-info">
                  <FontAwesomeIcon className="icon-funcionalidade" style={{ color: '' }} icon="plus-square" />
                  <p id="p-btn">Cadastro de Consultas</p>
                </Button>
              </div>
            </div>

            <div id="listas">
              <h3>Listas</h3>
              <div className="funcionalidade-item">
                <Button href="/listaclinicas" className="btn-funcionalidade" variant="outline-primary">
                  <FontAwesomeIcon className="icon-funcionalidade" style={{ color: '' }} icon="clipboard-list" />
                  <p id="p-btn">Lista de Clínicas</p>
                </Button>
              </div>

              <div className="funcionalidade-item">
                <Button href="/listausuarios" className="btn-funcionalidade" variant="outline-primary">
                  <FontAwesomeIcon className="icon-funcionalidade" style={{ color: '' }} icon="clipboard-list" />
                  <p id="p-btn">Lista de Usuários</p>
                </Button>
              </div>

              <div className="funcionalidade-item">
                <Button href="/listapacientes" className="btn-funcionalidade" variant="outline-primary">
                  <FontAwesomeIcon className="icon-funcionalidade" style={{ color: '' }} icon="clipboard-list" />
                  <p id="p-btn">Lista de Pacientes</p>
                </Button>
              </div>

              <div className="funcionalidade-item">
                <Button href="/listaconsultas" className="btn-funcionalidade" variant="outline-primary">
                  <FontAwesomeIcon className="icon-funcionalidade" style={{ color: '' }} icon="clipboard-list" />
                  <p id="p-btn">Lista de Consultas</p>
                </Button>
              </div>
              
            </div>
            </div>

          </div>
          <Rodape />
        </div>
      </div>
    );
  }
}

export default Funcionalidades;

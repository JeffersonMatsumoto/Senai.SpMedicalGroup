import React, { Component } from "react";
import { parseJwt, usuarioAutenticado } from "../../services/auth";

import { withRouter, Link } from "react-router-dom";
// import { Nav } from 'react-bootstrap';

import "../../assets/css/nav.css";

class NavHeader extends Component {

  logout(event) {
    event.preventDefault();
    localStorage.removeItem("user");
    this.props.history.push("/");
  }

  render() {
    if (usuarioAutenticado() && parseJwt().Permissao === "Administrador") {
      return (
        <div style={{ display: 'flex' }}>

          {/* <Nav.Link> */}
          <Link className="link" to="/funcionalidades" style={{ 'margin-right': '5em' }}>
            Funcionalidades
            </Link>
          {/* </Nav.Link> */}

          {/* <Link to="/consultas/cadastrar">Consultas</Link> */}
          {/* <Nav.Link> */}

          {/* <span style={{ marginRight: '5em' }}> */}
          <span style={{marginRight : '.5em' }}>Bem vindo(a), </span>
          <b id="nav-nome" style={{ marginRight: '5em', pointerEvents: 'none'}}>{parseJwt().Nome}</b> 
          {/* </span> */}

          <Link className="link" >
            <span
              onClick={this.logout.bind(this)}
              style={{ cursor: "pointer", marginRight: '2em' }}
            >
              Sair
              </span>
          </Link>
          {/* </Nav.Link> */}
        </div>
      );
    } else if (usuarioAutenticado() && parseJwt().Permissao === "Medico") {
      return (
        <div style={{ display: 'flex' }}>
          {/* <Nav.Link> */}
          <Link className="link" to="/consultasmedico" style={{ 'margin-right': '5em' }}>
            Minhas consultas
          </Link>
          {/* </Nav.Link> */}

          <span style={{marginRight : '.5em' }}>Bem vindo(a), </span>
          <b id="nav-nome" style={{ marginRight: '5em', pointerEvents: 'none'}}>{parseJwt().Nome}</b> 

          {/* <Nav.Link> */}
          <Link className="link">
            <span
              onClick={this.logout.bind(this)}
              style={{ cursor: "pointer", marginRight: '2em' }}
            >
              Sair
            </span>
          </Link>
          {/* </Nav.Link> */}
        </div>
      );
    } else if (usuarioAutenticado() && parseJwt().Permissao === "Paciente") {
      return (
        <div style={{ display: 'flex' }}>
          {/* <Nav.Link> */}
          <Link className="link" to="/consultaspaciente" style={{ 'margin-right': '5em' }}>
            Minhas consultas
          </Link>
          {/* </Nav.Link> */}

          <span style={{marginRight : '.5em' }}>Bem vindo(a), </span>
          <b id="nav-nome" style={{ marginRight: '5em', pointerEvents: 'none'}}>{parseJwt().Nome}</b> 

          {/* <Nav.Link> */}
          <Link className="link"  >
            <span
              onClick={this.logout.bind(this)}
              style={{ cursor: "pointer", marginRight: '2em' }}
            >
              Sair
              </span>
          </Link>
          {/* </Nav.Link> */}
        </div>
      );
    } else {
      return (
        <div>
          {/* <Nav.Link> */}
          <Link className="link" to="/login">Login</Link>
          {/* </Nav.Link> */}
        </div>
      );
    }
  }
}

export default withRouter(NavHeader);
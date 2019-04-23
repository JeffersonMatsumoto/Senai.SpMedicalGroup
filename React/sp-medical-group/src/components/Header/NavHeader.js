import React, { Component } from "react";
import { parseJwt, usuarioAutenticado } from "../../services/auth";

import { withRouter, Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';

class NavHeader extends Component {

  logout(event) {
    event.preventDefault();
    localStorage.removeItem("usuario-spmedicalgroup");
    this.props.history.push("/");
  }

  render() {
    if (usuarioAutenticado() && parseJwt().Permissao === "Administrador") {
      return (
        <div>

          <Nav.Link>
            <Link  to="/funcionalidades" >
            Funcionalidades
            </Link>
            </Nav.Link>

          {/* <Link to="/consultas/cadastrar">Consultas</Link> */}

          <span
            onClick={this.logout.bind(this)}
            style={{ cursor: "pointer" }}
          >
            Sair
          </span>

        </div>
      );
    } else if (usuarioAutenticado() && parseJwt().Permissao === "Médico") {
      return (
        <div>
          <Nav.Link>
            <Link  to="/consultasmedico" >
            Consultas
            </Link>
          </Nav.Link>
          <span
            onClick={this.logout.bind(this)}
            style={{ cursor: "pointer" }}
          >
            Sair
          </span>
        </div>
      );
    } else if (usuarioAutenticado() && parseJwt().Permissao === "Paciente") {
      return (
        <div>
          <Nav.Link>
            <Link to="/consultaspaciente">
              Consultas
          </Link>
          </Nav.Link>
          <span
            onClick={this.logout.bind(this)}
            style={{ cursor: "pointer" }}
          >
            Sair
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <Nav.Link>
            <Link to="/login">Login</Link>
          </Nav.Link>
        </div>
      );
    }
  }
}

export default withRouter(NavHeader);
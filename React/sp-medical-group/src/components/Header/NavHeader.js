import React, { Component } from "react";
import { parseJwt, usuarioAutenticado } from "../../services/auth";

import { withRouter } from "react-router-dom";
import { Nav } from 'react-bootstrap';

class NavHeader extends Component {

  logout(event) {
    event.preventDefault();
    localStorage.removeItem("usuario-spmedicalgroup");
    this.props.history.push("/");
  }

  render() {
    if (usuarioAutenticado() && parseJwt().Role === "Administrador") {
      return (
        <div>

          <Nav.Link to="/funcionalidades">Funcionalidades</Nav.Link>

          {/* <Link to="/consultas/cadastrar">Consultas</Link> */}
          
          <span
            onClick={this.logout.bind(this)}
            style={{ cursor: "pointer" }}
          >
            Sair
          </span>

        </div>
      );
    } else if (usuarioAutenticado() && parseJwt().Role === "Médico") {
      return (
        <div>
          <Nav.Link to="/consultasmedico">Consultas</Nav.Link>
          <span
            onClick={this.logout.bind(this)}
            style={{ cursor: "pointer" }}
          >
            Sair
          </span>
        </div>
      );
    } else if (usuarioAutenticado() && parseJwt().Role === "Paciente") {
      return (
        <div>
          <Nav.Link to="/consultaspaciente" style={{ color: 'black'}} >Consultas</Nav.Link>
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
          <Nav.Link to="/login">Login</Nav.Link>
        </div>
      );
    }
  }
}

export default withRouter(NavHeader);
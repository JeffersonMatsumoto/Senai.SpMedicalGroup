import React, { Component } from "react";

// import React, { Component, Fragment } from 'react';
import Logo from '../../assets/img/Logo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav } from 'react-bootstrap';

import { withRouter } from 'react-router-dom';

// import { usuarioAutenticado } from '../services/auth';
import NavHeader from '../Header/NavHeader'

// import { parseJwt, usuarioAutenticado } from "../../services/auth.js";

// import { withRouter, Link } from "react-router-dom";

//npm install react-bootstrap bootstrap

class Header extends Component {



    logout() {
        localStorage.removeItem("usuario-spmedicalgroup");
        this.props.history.push('/');
    }

    render() {
        // if (usuarioAutenticado() && parseJwt().Role === "Administrador") {
        return (
            <header>
                {/* <Nav variant="pills">
                <img id="logo" src={Logo} alt="logo" />
                <Nav.Item className="nav-item">
                    <Nav.Link href="/consultas">Consultas</Nav.Link>
                </Nav.Item>
                <Nav.Item className="nav-item">
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
            </Nav> */}

                {/* <img id="logo" src={Logo} alt="logo" />
            <Nav id="header-links">
                <Nav.Item>
                    <Nav.Link href="/consultas">Consultas</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
            </Nav> */}
                <Navbar fixed="top" style={{ 'borderBottom': '2px solid #ebebeb', 'backgroundColor': 'white' }}>
                    <Navbar.Brand href="/" style={{ 'width': '50%' }}>
                        <img
                            src={Logo}
                            width="5%"
                            height="5%"
                            className="d-inline-block align-top"
                            alt="logo"
                        />
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Item>
                            {/* <Nav.Link href="/consultas">CONSULTAS</Nav.Link> */}
                            {/* <Nav.Link> */}
                                <NavHeader />
                            {/* </Nav.Link> */}
                        </Nav.Item>
                        {/* <Nav.Item style={{ 'marginLeft' : '50%' }} >
                        <Nav.Link href="/login">LOGIN</Nav.Link>
                    </Nav.Item> */}
                    </Nav>
                </Navbar>
            </header>
        );
    }
}
export default withRouter(Header);
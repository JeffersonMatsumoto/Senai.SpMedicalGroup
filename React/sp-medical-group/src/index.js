import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import App from "./pages/Home/App";
import * as serviceWorker from './serviceWorker';

import {usuarioAutenticado} from "./services/auth";

import {parseJwt} from './services/auth';

import Login from './pages/Login/Login.js';
import NaoEncontrada from './pages/NaoEncontrada/NaoEncontrada.js';

import CadastroUsuario from './pages/Administrador/Cadastrar/CadastrarUsuario.js';
import CadastroPaciente from './pages/Administrador/Cadastrar/CadastrarPaciente.js';
import CadastroConsulta from './pages/Administrador/Cadastrar/CadastrarConsulta';
import CadastroClinica from './pages/Administrador/Cadastrar/CadastrarClinica';

import Funcionalidades from './pages/Administrador/Funcionalidades.js';

// ReactDOM.render(<App />, document.getElementById('root'));

//Verifica se o usuário esta logado e se o role é do tipo Admin
const PermissaoAdmin = ({ component: Component }) => (
    <Route
      render={props =>
        usuarioAutenticado() && parseJwt().Role === "Administrador" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
);

//Verifica se o usuário esta logado e se o role é do tipo Médico
const PermissaoMedico = ({ component: Component }) => (
    <Route
      render={props =>
        usuarioAutenticado() && parseJwt().Role === "Médico" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
  
  //Verifica se o usuário esta logado e se o role é do tipo Paciente
  const PermissaoPaciente = ({ component: Component }) => (
    <Route
      render={props =>
        usuarioAutenticado() && parseJwt().Role === "Paciente" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/login" component={Login} />

                {/* <PermissaoAdmin path="/tiposeventos" component={TiposEventos} /> */}
        
                {/* <PermissaoComum exact path="/eventos" component={EventoIndex} /> */}
                {/* <PermissaoAdmin path="/cadastrar" component={EventoCadastro} /> */}
                
                {/* dpois mudar para permissaoadmin */}
                {/* <PermissaoAdmin path="/usuario" component={CadastroUsuario} /> */}
                <Route path="/usuarios" component={CadastroUsuario} />

                <Route path="/prontuarios" component={CadastroPaciente}/>

                <Route path="/consultas" component={CadastroConsulta}/>

                <Route path="/clinicas" component={CadastroClinica}/>
                {/* <PermissaoAdmin path="/CadastroPaciente" component={CadastroPaciente} /> */}
                
                <Route path="/funcionalidades" component={Funcionalidades}/>

                <Route component={NaoEncontrada} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

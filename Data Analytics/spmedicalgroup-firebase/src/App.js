import React, { Component } from 'react';
import firebase from './services/firebaseConfig';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Button, Form } from 'react-bootstrap';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      listaUsuarios: [],
      nome: "",
      idade: "",
      longitude: '',
      latitude: '',
      doenca: '',
      especialidade: ""
    }
  }

  atualizaEstado(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  listarUsuarios() {
    firebase.firestore().collection("Usuarios")
      .onSnapshot((usuarios) => {
        let usuariosArray = [];

        usuarios.forEach((usuario) => {
          usuariosArray.push({
            id: usuario.id,
            nome: usuario.data().nome,
            idade: usuario.data().idade,

            longitude: usuario.data().longitude,
            latitude: usuario.data().latitude,
            doenca: usuario.data().doenca,

            especialidade: usuario.data().especialidade,
          })
        })
        this.setState({ listaUsuarios: usuariosArray }, () => {
          console.log(this.state.listaUsuarios)
        });
      })
  }

  cadastraLocalizacao(event) {
    event.preventDefault();

    if (this.state.idUsuario === 0) {
      firebase.firestore().collection("Usuarios")
        .add({
          latitude: this.state.latitude,
          longitude: this.state.longitude
        }).then((resultado) => {
          alert("Localizacao Cadastrada")
          this.limparFormulario();
        }).catch((erro) => {
          console.log('tag', erro)
        })
    }
  }

  componentDidMount() {
    this.listarUsuarios();
  }

  render() {
    return (
      <div style={{
        // display: 'grid',
        // gridTemplateColumns: '1fr 1fr',
        // width: '100%'
      }}>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />

        <div>
          <h2 style={{ marginLeft: '2%' }} >Lista de Usuários</h2>

          <ul>
            {
              this.state.listaUsuarios.map((usuario, key) => {
                return (
                  <li key={key}>
                    {usuario.nome} / {usuario.idade} / {usuario.especialidade} / {usuario.doenca} / {usuario.latitude} / {usuario.longitude}
                  </li>
                )
              })
            }
          </ul>
        </div>

        <Form style={{ marginLeft: '2%' }} onSubmit={this.cadastraLocalizacao.bind(this)}>

          <h2>Cadastro de Localização</h2>
{/*           
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control style={{ width: '25%' }} type="text" name="nome" value={this.state.nome} onChange={this.atualizaEstado.bind(this)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Especialidade</Form.Label>
            <Form.Control style={{ width: '25%' }} type="text" name="especialidade" value={this.state.especialidade} onChange={this.atualizaEstado.bind(this)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Idade</Form.Label>
            <Form.Control style={{ width: '25%' }} type="text" name="idade" value={this.state.idade} onChange={this.atualizaEstado.bind(this)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Doença</Form.Label>
            <Form.Control style={{ width: '25%' }} type="text" name="doenca" value={this.state.doenca} onChange={this.atualizaEstado.bind(this)} />
          </Form.Group>
           */}
          <Form.Group>
            <Form.Label>Latitude</Form.Label>
            <Form.Control style={{ width: '25%' }} type="text" name="latitude" value={this.state.latitude} onChange={this.atualizaEstado.bind(this)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Longitude</Form.Label>
            <Form.Control style={{ width: '25%' }} type="text" name="longitude" value={this.state.longitude} onChange={this.atualizaEstado.bind(this)} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Enviar
          </Button>

        </Form>

        <div style={{ marginTop: '2%' }}>
          <Map 
            controlSize
            google={this.props.google} 
            zoom={15}
            initialCenter={{
              lat: -23.5345442,
              lng: -46.6493879
            }}
            styles={tamanho}
          >
            <Marker onClick={this.onMarkerClick}
              name={'Current location'} />

            {
              this.state.listaUsuarios.map((usuario) => {
                return (
                  <Marker
                    title={usuario.nome} 
                    position={{lat: usuario.latitude, lng: usuario.longitude}}
                  />
                )
              })
            }
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBTgGsrboDqra1bK7KCZioT_B5w7iFqlxs")
})(App)

const tamanho={
  // display: 'flex',
  // width:'100%' 
}
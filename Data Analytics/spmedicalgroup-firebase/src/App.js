import React, { Component } from 'react';
import firebase from './services/firebaseConfig';

// https://www.youtube.com/watch?v=ke1pkMV44iU

// https://www.youtube.com/watch?v=29Dp2mSwS4w

// https://www.youtube.com/watch?v=SySVBV_jcCM

// npm install react-bootstrap bootstrap
import { Button, Form } from 'react-bootstrap';

import Geocode from 'react-geocode';
// npm install --save react-geocode

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      listaUsuarios: [],
      nome: "",
      idade: "",

      // localizacao: [
      longitude: '',
      latitude: '',
      // ],

      especialidade: "",
      idUsuario: 0
    }
  }

  atualizaEstado(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  listarUsuarios() {
    firebase.firestore().collection("Usuarios")
      .onSnapshot((usuarios) => {
        let usuariosArray = [];

        // const rootRef = firebase.database().ref().child('drivers');
        // rootRef.on('child_added', snap => {
        //   const previousList = this.state.localizacao;
        //   previousList.append({
        //       id: snap.key,
        //       latitude: snap.val().lat,
        //       longitude: snap.val().lon
        //   });
        // });

        // let localizacaoArray = [];

        usuarios.forEach((usuario) => {
          usuariosArray.push({
            id: usuario.id,
            nome: usuario.data().Nome,
            idade: usuario.data().Idade,

            longitude: usuario.data().longitude,
            latitude: usuario.data().latitude,

            // localizacao: usuario.data().Localizacao,
            // localizacao: usuario.data().localizacao[latitude, longitude],


            especialidade: usuario.data().Especialidade,
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
          // localizacao: firebase.firestore.GeoPoint(latitude, longitude),
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

  // pegarDados() {
  //   return this.state.localizacao.map((coordenadas) => {
  //     return (
  //       <option key={coordenadas}>
  //         {coordenadas.latitude} / {coordenadas.longitude}
  //       </option>
  //     )
  //   }
  // }

  exibirEndereco(){
    Geocode.fromLatLng("48.8583701", "2.2922926").then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    // const listOfPositions = this.state.localizacao.map(position => 
    //   <div>
    //       <h1>{position.id}</h1>
    //       <h1>{position.latitude}</h1>
    //       <h1>{position.longitude}</h1>
    //   </div>
    // )
    return (

      <div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />

        <div>
        <h2 style={{ marginLeft: '2%'}} >Lista de Usuários</h2>

        <ul>
          {
            this.state.listaUsuarios.map((usuario, key) => {
              return (
                <li key={key}>
                  {usuario.nome} / {usuario.idade} / {usuario.especialidade} / {usuario.latitude} / {usuario.longitude}
                </li>
              )
            })
          }
        </ul>
        </div>

        <Form style={{ marginLeft: '2%'}} onSubmit={this.cadastraLocalizacao.bind(this)}>

          <h2>Cadastro de Localização</h2>

          <Form.Group>
            <Form.Label>Latitude</Form.Label>
            <Form.Control style={{ width: '25%' }} type="text" name="latitude" value={this.state.latitude} onChange={this.atualizaEstado.bind(this)}/> 
          </Form.Group>

          <Form.Group>
            <Form.Label>Longitude</Form.Label>
              <Form.Control style={{ width: '25%' }} type="text" name="longitude" value={this.state.longitude} onChange={this.atualizaEstado.bind(this)}  />
          </Form.Group>

          <Button variant="primary" type="submit">
            Enviar
          </Button>

        </Form>

        <Button variant="primary" onClick={this.exibirEndereco()}>
            Mostra endereço pela latitude e longitude
        </Button>
      
      </div>
    )
  }
}
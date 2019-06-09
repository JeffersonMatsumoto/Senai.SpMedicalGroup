import React, { Component } from 'react';
import firebase from './services/firebaseConfig';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Button, Form, Table } from 'react-bootstrap';

import Geocode from "react-geocode";

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
      especialidade: "",

      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},

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

    // if (this.state.idUsuario === 0) {
      firebase.firestore().collection("Usuarios")
        .add({
          nome: this.state.nome,
          idade: this.state.idade,
          doenca: this.state.doenca,
          especialidade: this.state.especialidade,


          latitude: this.state.latitude,
          longitude: this.state.longitude
        }).then((resultado) => {
          alert("Localizacao Cadastrada")
          // this.limparFormulario();
        }).catch((erro) => {
          console.log('tag', erro)
        })
    // }
  }

  componentDidMount() {
    this.listarUsuarios();
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };
    
    converterEmEndereco(){
      Geocode.setApiKey("AIzaSyBTgGsrboDqra1bK7KCZioT_B5w7iFqlxs");
      // Geocode.fromLatLng
      Geocode.fromLatLng("48.8583701", "2.2922926")
        .then(
        response => {
          const address = response.results[0].formatted_address;
          alert(address);
        },
        error => {
          console.error(error);
        }
      );
    }

  render() {
    return (
      <div style={{ }}>

      <div style={{ marginTop: '.5%', display: 'grid', paddingBottom: '2%', gridTemplateColumns: '0.4fr 1fr', fontFamily: 'Saira Semi Condensed' }}>
        
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <link href="https://fonts.googleapis.com/css?family=Saira+Semi+Condensed&display=swap" rel="stylesheet"></link>
        
        <Form style={{ paddingRight: '5%',borderRight: '3px solid rgb(212, 212, 212)', marginLeft: '2%', justifySelf: 'center' }} onSubmit={this.cadastraLocalizacao.bind(this)}>

          <h2 style={{ marginTop: '.5%', fontWeight: 'bold' }}>Formulário de cadastro</h2>

          

          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control required style={{  }} type="text" name="nome" value={this.state.nome} onChange={this.atualizaEstado.bind(this)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Especialidade</Form.Label>
            <Form.Control required as='select' required style={{  }} type="text" name="especialidade" value={this.state.especialidade} onChange={this.atualizaEstado.bind(this)} >
              <option selected="selected disabled hidden" ></option>
              <option>Odontologista</option>
              <option>Otorrinolaringologista</option>
              <option>Otorpedista</option>
              <option>Endocrinologista</option>
              <option>Psiquiatra</option>
              <option>Pediatra</option>
              <option>Clínico Geral</option>
              <option>Oftalmologista</option>
              <option>Dermatologista</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Idade</Form.Label>
            <Form.Control min="1" required style={{  }} type="number" name="idade" value={this.state.idade} onChange={this.atualizaEstado.bind(this)} />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Doença</Form.Label>
            <Form.Control required style={{  }} type="text" name="doenca" value={this.state.doenca} onChange={this.atualizaEstado.bind(this)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Latitude</Form.Label>
            <Form.Control required style={{  }} type="text" name="latitude" value={this.state.latitude} onChange={this.atualizaEstado.bind(this)} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Longitude</Form.Label>
            <Form.Control required style={{  }} type="text" name="longitude" value={this.state.longitude} onChange={this.atualizaEstado.bind(this)} />
          </Form.Group>

          <Button variant="primary" style={{ width: '100%' }} size="lg" type="submit">
            Enviar
          </Button>

        </Form>

        <div style={{ textAlign: 'center', marginRight: '2%', paddingRight:'2%', paddingLeft:'2%'}}>

          <h2 style={{ marginTop: '.1%', marginLeft: '2%', fontWeight: 'bold' }} >Lista de localizações</h2>

          {/* <ul>
            {
              this.state.listaUsuarios.map((usuario, key) => {
                return (
                  <li key={key}>
                    {usuario.nome} / {usuario.idade} / {usuario.especialidade} / {usuario.doenca} / {usuario.latitude} / {usuario.longitude}
                  </li>
                )
              })
            }
          </ul> */}
          
          <Table  striped bordered hover variant='dark'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Especialidade</th> 
                            <th>Diagnóstico</th>
                            <th>Latitude e Longitude</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.listaUsuarios.map((user) => {
                                return (
                                    <tr>
                                        <td>{user.nome}</td>
                                        <td>{user.idade}</td>
                                        <td>{user.especialidade}</td>
                                        <td>{user.doenca}</td>
                                        <td>{user.latitude}, {user.longitude}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
                
                <Button type="button" onClick={this.converterEmEndereco()}>Converter coordenadas em endereço</Button>
        </div>
        
        
        </div>

        <div style={{ marginTop: '2%' }}>
          
          <Map
            controlSize
            google={this.props.google}
            zoom={15}
            initialCenter={{
              lat: -23.5345442,
              lng: -46.6493879
            }}
            onClick={this.onMapClicked}
            styles={tamanho}
          >


            {
              this.state.listaUsuarios.map((usuario) => {
                return (
                  <Marker
                    onClick={this.onMarkerClick}  
                    clickable
                    title={`Nome: ${usuario.nome}, Idade: ${usuario.idade}, Especialidade: ${usuario.especialidade}, Diagnóstico: ${usuario.doenca}`}
                    position={{ lat: usuario.latitude, lng: usuario.longitude }}>
                    
                      <InfoWindow 
                       marker={this.state.activeMarker}
                       visible={this.state.showingInfoWindow}
                      >
                        <h1></h1>
                      </InfoWindow>
                    
                  </Marker>
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

const tamanho = {
  // display: 'flex',
  // width:'100%' 
}
import React, { Component } from 'react';
import firebase from './services/firebaseConfig';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Button, Form, Table, Navbar } from 'react-bootstrap';

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
          // console.log(this.state.listaUsuarios)
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


  // The number of requests has exceeded the usage limits for the Maps JavaScript API. Your app's requests will work again at the next daily quota reset.
  //reseta no dia seguinte a quantidade de requisições para essa API

  converterEmEndereco(user) {
    Geocode.setApiKey("AIzaSyBTgGsrboDqra1bK7KCZioT_B5w7iFqlxs");
    Geocode.fromLatLng(user.latitude, user.longitude) //-23.5274636,-46.6720958 // user.latitude, user.longitude
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
    const {google} = this.props;
    return (
      <div style={{ fontFamily: 'Saira Semi Condensed' }}>

        <Navbar style={{ display: 'flex', justifyContent: 'center', marginBottom: '2%', borderColor: 'lightgrey', borderStyle: 'double' }} bg="light">
          <Navbar.Brand style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img
              src={require('./assets/img/logo.png')}
              width="30"
              height="30"
              alt="Logo SP Medical Group"
            />
            <span style={{ fontWeight: 'bold', marginInlineStart: '5%' }}>Sistema de localização de usuários</span>
          </Navbar.Brand>
        </Navbar>

        <div style={{ marginTop: '.5%', display: 'grid', paddingBottom: '2%', gridTemplateColumns: '0.4fr 1fr' }}>

          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
          <link href="https://fonts.googleapis.com/css?family=Saira+Semi+Condensed&display=swap" rel="stylesheet"></link>

          <Form style={{ paddingRight: '5%', borderRight: '3px solid rgb(212, 212, 212)', marginLeft: '2%', justifySelf: 'center' }} onSubmit={this.cadastraLocalizacao.bind(this)}>

            <h2 style={{ fontWeight: 'bold' }}>Formulário de cadastro</h2>



            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control required style={{ textTransform: 'capitalize' }} type="text" name="nome" value={this.state.nome} onChange={this.atualizaEstado.bind(this)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Especialidade</Form.Label>
              <Form.Control required as='select' type="text" name="especialidade" value={this.state.especialidade} onChange={this.atualizaEstado.bind(this)} >
                <option
                  defaultValue
                // selected="selected disabled hidden"
                ></option>
                <option>Oncologista</option>
                <option>Neurologista</option>
                <option>Odontologista</option>
                <option>Otorrinolaringologista</option>
                <option>Otorpedista</option>
                <option>Endocrinologista</option>
                <option>Psiquiatra</option>
                <option>Pediatra</option>
                <option>Clínico Geral</option>
                <option>Oftalmologista</option>
                <option>Dermatologista</option>
                <option>Urologista</option>
                <option>Ginecologista</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Idade</Form.Label>
              <Form.Control min="1" required style={{}} type="number" name="idade" value={this.state.idade} onChange={this.atualizaEstado.bind(this)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Diagnóstico</Form.Label>
              <Form.Control required style={{ textTransform: 'capitalize' }} type="text" name="doenca" value={this.state.doenca} onChange={this.atualizaEstado.bind(this)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Latitude</Form.Label>
              <Form.Control step={0.001} min={-90} required style={{}} type="text" name="latitude" value={this.state.latitude} onChange={this.atualizaEstado.bind(this)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Longitude</Form.Label>
              <Form.Control step={0.001} min={-180} required style={{}} type="text" name="longitude" value={this.state.longitude} onChange={this.atualizaEstado.bind(this)} />
            </Form.Group>

            <Button variant="primary" style={{ width: '100%' }} size="lg" type="submit">
              Enviar
          </Button>

          </Form>

          <div style={{ textAlign: 'center', marginRight: '2%', paddingRight: '2%', paddingLeft: '2%' }}>

            <h2 style={{ fontWeight: 'bold' }} >Lista de localizações</h2>

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

            <Table striped bordered hover variant='dark'>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Especialidade</th>
                  <th>Diagnóstico</th>
                  <th>Latitude e Longitude</th>
                  <th>Endereço</th>
                </tr>
              </thead>

              <tbody>
                {
                  this.state.listaUsuarios.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td style={{ fontSize: '.75em', verticalAlign: 'inherit' }} >{user.nome}</td>
                        <td style={{ fontSize: '.75em', verticalAlign: 'inherit' }}>{user.idade}</td>
                        <td style={{ fontSize: '.75em', verticalAlign: 'inherit' }}>{user.especialidade}</td>
                        <td style={{ fontSize: '.75em', verticalAlign: 'inherit' }}>{user.doenca}</td>
                        <td style={{ fontSize: '.75em', verticalAlign: 'inherit' }}>{user.latitude}, {user.longitude}</td>
                        <td>
                          <Button variant="outline-primary" size='sm' style={{ alignSelf: 'center' }} type="button"
                            // onClick={this.converterEmEndereco(user)}
                            >
                            Converter coordenadas em endereço
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </Table>


          </div>


        </div>

        <div style={{ marginTop: '2%' }}>

          <Map
            controlSize
            google={this.props.google}
            zoom={14}
            initialCenter={{
              lat: -23.5364985,
              lng: -46.6483357
            }}
            onClick={this.onMapClicked}
            // styles={tamanho}
            style={{ margin: '2%', width: '96%', height: '100%' }}
          >

            {/* <Map google={this.props.google}
              onClick={this.onMapClicked}>
              <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                </div>
              </InfoWindow>
              </Map> */}

            {
              this.state.listaUsuarios.map((usuario) => {
                return (
                  <Marker
                    key={usuario.id}
                    onClick={this.onMarkerClick}
                    clickable
                    // name={"a"}
                    icon={{
                      url: require('./assets/img/pin.svg')
                      ,                    
                      anchor: new google.maps.Point(32,32),
                      scaledSize: new google.maps.Size(64,64)
                    }}
                    title={`Nome: ${usuario.nome}, Idade: ${usuario.idade}, Especialidade: ${usuario.especialidade}, Diagnóstico: ${usuario.doenca}`}
                    position={{ lat: usuario.latitude, lng: usuario.longitude }}>

                    <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                    >
                      <h1>teste</h1>
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

// const tamanho = {
  // display: 'flex',
  // width:'100%' 
// }
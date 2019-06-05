import React, { Component } from 'react';
import firebase from './services/firebaseConfig';

// https://www.youtube.com/watch?v=ke1pkMV44iU

// npm install react-bootstrap bootstrap
import { Button, Form } from 'react-bootstrap';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      listaUsuarios: [],
      nome: "",
      idade: "",

      localizacao: [
        longitude = '',
        latitude = ''
      ],

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

        let localizacaoArray = [];

        usuarios.forEach((usuario) => {
          usuariosArray.push({
            id: usuario.id,
            nome: usuario.data().Nome,
            idade: usuario.data().Idade,

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
          localizacao: firebase.firestore.GeoPoint(latitude, longitude),
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

        <h2>Lista de Usuários</h2>
        <ul>
          {
            this.state.listaUsuarios.map((usuario, key) => {
              return (
                <li key={key}>
                  {/* {usuario.id} /  */}
                  {usuario.nome} / {usuario.idade} / {usuario.especialidade}
                  {/* / {listOfPositions} */}

                  {/* {
                    this.state.localizacao.map(() =>
                      <div>
                        <p>{latitude}</p>
                        <p>{longitude}</p></div>)
                  } */}

                </li>
              )
            })
          }
        </ul>

        {/* <form onSubmit={this.cadastraLocalizacao.bind(this)}>
          <div>
            <label>Localização (latitude): </label>
            <input
              name="longitude"
              required
              placeholder="Insira uma latitude"
              // value={this.state.localizacao.latitude}
              onChange={this.atualizaEstado.bind(this)}
              type="text">
            </input>
          </div>
          <div>
            <label>Localização (longitude): </label>
            <input
              name="longitude"
              required
              placeholder="Insira uma longitude"
              // value={this.state.localizacao.longitude}
              onChange={this.atualizaEstado.bind(this)}
              type="text">
            </input>
          </div>
          <button type="submit">Enviar</button>
        </form> */}

        <Form 
        style={{  marginLeft: '2%',
        //  marginRight: '5%'
         }}
         onSubmit={this.cadastraLocalizacao.bind(this)}>
          <h2 style={{ fontWeight: 'bold' }}>Cadastro de Localização</h2>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ fontWeight: 'bold' }}>Latitude</Form.Label>
            <Form.Control style={{ width: '25%' }} type="text" placeholder="Insira uma latitude" />

            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}

          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ fontWeight: 'bold' }}>Longitude</Form.Label>
            <Form.Control style={{ width: '25%' }} type="text" placeholder="Insira uma longitude" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>

      </div>
    )
  }



}
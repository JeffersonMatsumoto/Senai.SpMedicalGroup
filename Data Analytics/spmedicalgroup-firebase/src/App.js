import React, { Component } from 'react';
import firebase from './services/firebaseConfig';

// https://www.youtube.com/watch?v=ke1pkMV44iU

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      listaUsuarios: [],
      nome: "",
      idade: "",
      // localizacao: [longitude = '', latitude = ''],
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
          localizacao: this.state.localizacao,
        }).then((resultado) => {
          alert("Localizacao Cadastrado")
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

        <form onSubmit={this.cadastraLocalizacao.bind(this)}>
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
        </form>


      </div>
    )
  }



}
//pagina responsavel em redirecionar o ADM para suas funçoes (cadastro/listas)

//inspiracao https://www.awwwards.com/sites/fl-hospital-nicholson-center
import React, { Component } from 'react';

import Header from '../../components/Header/Header.js';
import Rodape from '../../components/Rodape/Rodape.js';

class Funcionalidades extends Component {
    render() {
      return (
        <div>
          <div>
            <Header/>

            


            <Rodape/>
          </div>
        </div>
      );
    }
  }

  export default Funcionalidades;

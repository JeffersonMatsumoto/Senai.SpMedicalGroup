import React, { Component } from 'react';
// import './App.css';
import Header from '../../components/Header/Header.js';
import Rodape from '../../components/Rodape/Rodape.js';
import Banner from '../../assets/img/Banner.jpg';
import SegundoBanner from '../../assets/img/Banner-layout.png';
import "../../assets/css/home.css";
import { Carousel } from 'react-bootstrap';

// https://www.w3schools.com/howto/howto_css_parallax.asp


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div id="container"> */}
          <Header />
          {/* <div style= {{'height': '1000px', 'backgroundColor' : 'black' }}> */}
          {/* <span style={{ 'height': '1000000px', 'width': '100%', 'backgroundImage' : 'url('+Banner+')', 'backgroundSize' : 'cover'  }} src={Banner} alt="banner" ></span> */}
          {/* <img id="imgBanner" style={{ 'width': '100%'  }} src={Banner} alt="banner" /> */}
          {/* <h1> */}
          {/* <Button variant="outline-primary">Veja suas consultas aqui !</Button> */}
          {/* Os melhores profissionais empenhados em cuidar da saúde de quem precisa. */}
          {/* </h1> */}
          {/* </div> */}

          {/* <div id="banner-container">
              <div id="banner-filtro">
              <h1 id="h1-home" onClick={()=>alert("Em desenvolvimento...")}>  Veja suas consultas quando e onde quiser utilizando nosso app ! </h1>
              </div>
            </div> */}
          <div id="banner-container">
          <Carousel>

            <Carousel.Item>

              <Carousel.Caption>
                <h2 className="h2-banner">Os melhores profissionais empenhados em cuidar da saúde de quem precisa.</h2>

              </Carousel.Caption>
                <img className="img-banner" src={Banner} alt="banner"></img>

            </Carousel.Item>

            <Carousel.Item>
              
              <Carousel.Caption>
                <h2 className="h2-banner">Veja suas consultas quando, como e onde quiser.</h2>
              </Carousel.Caption>
                <img className="img-banner" src={SegundoBanner} alt="segundo banner"></img>

            </Carousel.Item>
            
            {/* <Carousel.Item>
              

              <Carousel.Caption>
                <Button>Visualize suas consultas agora mesmo!</Button>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>

            </Carousel.Item> */}

          </Carousel>
          </div>
          <Rodape />
        {/* </div> */}
      </div>
    );
  }
}

export default App;

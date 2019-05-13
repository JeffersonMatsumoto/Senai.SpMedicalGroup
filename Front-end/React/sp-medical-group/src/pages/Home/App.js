import React, { Component } from 'react';
// import './App.css';
import Header from '../../components/Header/Header.js';
import Rodape from '../../components/Rodape/Rodape.js';
import Banner from '../../assets/img/Banner.jpg';
import SegundoBanner from '../../assets/img/Banner-layout.png';
import "../../assets/css/home.css";
// import { Carousel } from 'react-bootstrap';

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
          {/* <Carousel> */}

          {/* <Carousel.Item> */}

          {/* <Carousel.Caption> */}
          {/* <h2 className="h2-banner">Os melhores profissionais empenhados em cuidar da saúde de quem precisa.</h2> */}

          {/* </Carousel.Caption> */}

          <div id="banner-h">
            <img className="img-banner" src={Banner} alt="banner"></img>
            <div><img className="img-banner" src={SegundoBanner} alt="segundo banner"></img>
              {/* <h2 className="h">Os melhores profissionais empenhados em cuidar da saúde de quem precisa.</h2> */}
              {/* <h2 className="h">Veja suas consultas quando, como e onde quiser.</h2> */}
            </div>
          </div>
          {/* </Carousel.Item> */}

          {/* <Carousel.Item> */}

          {/* <Carousel.Caption> */}
          {/* <h2 className="h2-banner">Veja suas consultas quando, como e onde quiser.</h2> */}
          {/* </Carousel.Caption> */}
          {/* <img className="img-banner" src={SegundoBanner} alt="segundo banner"></img> */}

          {/* </Carousel.Item> */}

          {/* <Carousel.Item>
              

              <Carousel.Caption>
                <Button>Visualize suas consultas agora mesmo!</Button>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>

            </Carousel.Item> */}

          {/* </Carousel> */}
        </div>
        <Rodape />
        {/* </div> */}
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.887132913111!2d-46.648477084454164!3d-23.536561566563364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5843deade6e3%3A0x124f377d06c7e71f!2sAlameda+Bar%C3%A3o+de+Limeira%2C+539+-+Campos+El%C3%ADseos%2C+S%C3%A3o+Paulo+-+SP%2C+01202-001!5e0!3m2!1spt-PT!2sbr!4v1555096014275!5m2!1spt-PT!2sbr"
          width="30%"
          height="30%"
          frameborder="1"
          // allowfullscreen
          scrolling="no"
        /> */}
      </div>
    );
  }
}

export default App;

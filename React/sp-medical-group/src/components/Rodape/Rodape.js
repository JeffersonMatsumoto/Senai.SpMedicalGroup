import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';

function Rodape() {
    return (
        <footer>
            {/* className="fixed-bottom" */}
            <Card  style={{ background: "#80D78F" }}>
                <Card.Footer className="text-center"> 
                    
                    <span style={{ fontSize: "0.7em" }} >
                    <b>© 2019 SP MEDICAL GROUP</b>
                        {/* <br></br> */}
                        {/* <p>Todos os direitos reservados</p> */}
                    </span>
                </Card.Footer>
            </Card>
        </footer>
    );
}

export default Rodape;
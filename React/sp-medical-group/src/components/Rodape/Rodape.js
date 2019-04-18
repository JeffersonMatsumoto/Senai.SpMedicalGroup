import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';

function Rodape() {
    return (
        <footer>
            <Card className="fixed-bottom" style={{ background: "#80D78F" }}>
                <Card.Footer className="text-center"> 
                    <b>© 2019 SP MEDICAL GROUP</b>
                        <br></br>
                        Todos os direitos reservados
                </Card.Footer>
            </Card>
        </footer>
    );
}

export default Rodape;
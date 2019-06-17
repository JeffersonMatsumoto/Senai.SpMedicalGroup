//autenticacao

// .permissao

export const usuarioAutenticado = () => localStorage.getItem("user") !== null;

export const parseJwt = () =>{
    var base64Url = localStorage.getItem("user").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    return JSON.parse(window.atob(base64));
}
// https://www.unixtimestamp.com/index.php
//verificar se o token está valido 
export const verToken  = () => {
    let tokenValido = parseJwt();
    console.log(new Date(tokenValido.exp))
    console.log(new Date(tokenValido.exp* 1000))
    console.log(new Date(Date.now()))
    console.log(new Date(Date.now() / 1000))
    if (tokenValido !== null){
        if(Date.now() <= tokenValido.exp * 1000){
            return true;
        } 
    }
    return false;
}
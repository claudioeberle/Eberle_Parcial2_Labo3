
const loader = document.querySelector("#loader");

const URL = "http://localhost:3000/monstruos";

function getMonstruos(){

    const xhr = new XMLHttpRequest();

    loader.classList.remove("oculto");
    //setear evento ready state change

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){

            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                localStorage.setItem('monstruos', JSON.stringify(data));
            }
            else{
                console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
            }
            loader.classList.add("oculto");
        }
    }

    //open peticion configura
    xhr.open("GET", URL, true);

    //enviar
    try{
        xhr.send();
    }
    catch(error){
        console.log(error);
    }
}

function getMonstruo(id){
    const xhr = new XMLHttpRequest();

    loader.classList.remove("oculto");
    //setear evento ready state change

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){

            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                localStorage.setItem('monstruos', JSON.stringify(data));
            }
            else{
                console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
            }
            loader.classList.add("oculto");
        }
    }

    //open peticion configura

    xhr.open("GET", URL + `/${id}`, true);

    //enviar
    try{
        xhr.send();
    }
    catch(error){
        console.log(error);
    }
}

function postMonstruo(new_monstruo){
    
    const xhr = new XMLHttpRequest();

    loader.classList.remove("oculto");
    //setear evento ready state change

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){

            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                localStorage.setItem('monstruos', JSON.stringify(data));
                console.log(localStorage.getItem('monstruos'));
            }
            else{
                
                console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
                console.error('Response Text:', xhr.responseText); 

            }
            loader.classList.add("oculto");
        }
    }
    //open peticion configura
    xhr.open("POST", URL, true);
    
    //seteo la cabecera
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    //enviar
    try{
        xhr.send(JSON.stringify(new_monstruo));
    }
    catch(error){
        console.log(error);
    }
}

function deleteMonstruo(id){
    
    const xhr = new XMLHttpRequest();

    loader.classList.remove("oculto");
    //setear evento ready state change

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){

            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                localStorage.setItem('monstruos', JSON.stringify(data));
            }
            else{
                console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
            }
            loader.classList.add("oculto");
        }
    }

    //open peticion configura
    xhr.open("DELETE", URL + `/${id}`, true);

    //enviar
    try{
        xhr.send();
    }
    catch(error){
        console.log(error);
    }
}

function updateMonstruo(updated_monstruo){

    const xhr = new XMLHttpRequest();

    loader.classList.remove("oculto");
    //setear evento ready state change

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){

            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
                localStorage.setItem('monstruos', JSON.stringify(data));
            }
            else{
                console.error(`ERROR ${xhr.status}: ${xhr.statusText}`);
            }
            loader.classList.add("oculto");
        }
    }
    //open peticion configura
    xhr.open("PATCH", URL + `/${updated_monstruo.id}`, true);
    
    //seteo la cabecera
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    //enviar
    try{
        xhr.send(JSON.stringify(updated_monstruo));
    }
    catch(error){
        console.log(error);
    }
}

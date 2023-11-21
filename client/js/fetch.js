const loader = document.querySelector("#loader");

const URL = "http://localhost:3000/monstruos";

const getMonstruos = async ()=>{

    loader.classList.remove("oculto");

    try {
        const res = await fetch(URL);
        if(!res.ok){
            throw res;
        }
        const data = await res.json();
        localStorage.setItem('monstruos', JSON.stringify(data));
    }
    catch(res){
        
        console.error(`Error ${res.status}: ${res.statusText}`);
    }
    finally{

        loader.classList.add("oculto");
    }
}

const getMonstruo = async (id) => {
    
    loader.classList.remove("oculto");
    //setear evento ready state change

    try {
        const res = await fetch(URL + `/${id}`);
        if(!res.ok){
            console.log("Error");
            throw res;
        }
        const data = await res.json();
        localStorage.setItem('monstruos', JSON.stringify(data));
    }
    catch(res){
        
        console.error(`Error ${res.status}: ${res.statusText}`);
    }
    finally{
        loader.classList.add("oculto");
    }
}

function postMonstruo(new_monstruo){
    

    loader.classList.remove("oculto");
    //setear evento ready state change

    loader.classList.remove("oculto");

    fetch(URL, {
        method:"POST",
        headers: {
            "Content-Type":"application/json;charset=UTF-8"
        },
        body:JSON.stringify(new_monstruo),
    })
    .then(response => response.ok?response.json():Promise.reject(response))
    .then(data => localStorage.setItem('monstruos', JSON.stringify(data)))
    .catch(response => console.error(`Error ${response.status}: ${response.statusText}`))
    .finally(() => loader.classList.add("oculto"))
}

const deleteMonstruo = async(id) => {
    
    loader.classList.remove("oculto");

    try {
        const res = await fetch(URL + `/${id}`, {
            method:"DELETE",  
        });
        if(!res.ok){
            throw res;
        }
        const data = await res.json();
        localStorage.setItem('monstruos', JSON.stringify(data));
    }
    catch(res){
        
        console.error(`Error ${res.status}: ${res.statusText}`);
    }
    finally{
        loader.classList.add("oculto");
    }
}

function updateMonstruo(updated_monstruo){

    loader.classList.remove("oculto");

    fetch(URL + `/${updated_persona.id}`, {
        method:"PUT",
        headers: {
            "Content-Type":"application/json;charset=UTF-8"
        },
        body:JSON.stringify(updated_persona),
    })
    .then(response => response.ok?response.json():Promise.reject(response))
    .then(data => localStorage.setItem('monstruos', JSON.stringify(data)))
    .catch(response => console.error(`Error ${response.status}: ${response.statusText}`))
    .finally(() => loader.classList.add("oculto"))
}

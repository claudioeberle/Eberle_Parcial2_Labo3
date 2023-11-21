
const loader = document.querySelector("#loader");

const URL = "http://localhost:3000/monstruos";

function getMonstruos(){

    loader.classList.remove("oculto");

    axios.get(URL)
    .then(({data})=>{
        localStorage.setItem('monstruos', JSON.stringify(data));
        console.log(data);
    })
    .catch(({message})=>{
        console.error(message);
    })
    .finally(()=>{
        loader.classList.add("oculto");
    })
}

function getMonstruo(id){
    
    loader.classList.remove("oculto");

    axios.get(URL + `/${id}`)
    .then(({data})=>{
        localStorage.setItem('monstruos', JSON.stringify(data));
        console.log(data);
    })
    .catch(({message})=>{
        console.error(message);
    })
    .finally(()=>{
        loader.classList.add("oculto");
    })
}

function postMonstruo(new_monstruo){
    
    loader.classList.remove("oculto");

    axios.post(URL, new_monstruo)
    .then(({data})=>{
        localStorage.setItem('monstruos', JSON.stringify(data));
        console.log(data);
    })
    .catch(({message})=>{
        console.error(message);
    })
    .finally(()=>{
        loader.classList.add("oculto");
    })
}

function deleteMonstruo(id){
    
    loader.classList.remove("oculto");

    axios.delete(URL + `/${id}`)
    .then(({data})=>{
        localStorage.setItem('monstruos', JSON.stringify(data));
        console.log(data);
    })
    .catch(({message})=>{
        console.error(message);
    })
    .finally(()=>{
        loader.classList.add("oculto");
    })
}

function updateMonstruo(updated_monstruo){
    
    loader.classList.remove("oculto");

    axios.put(URL + `/${updated_monstruo.id}`, updated_monstruo)
    .then(({data})=>{
        localStorage.setItem('monstruos', JSON.stringify(data));
        console.log(data);
    })
    .catch(({message})=>{
        console.error(message);
    })
    .finally(()=>{
        loader.classList.add("oculto");
    })
}
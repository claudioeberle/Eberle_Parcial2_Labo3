let monstruos;
let iconos = ["bat.png", "castle.png", "ghost.png", "apple.png", "hand.png", "pumpkin.png", "toad.png", "witch.png", "scarecrow.png", "spider.png", "spider-web.png", "frankenstein.png", "cat.png", "cauldron.png"]

window.onload = function () {
    try {
        
        const monstruosGuardados = localStorage.getItem('monstruos');
        if (monstruosGuardados.length > 0) {
            monstruos = JSON.parse(monstruosGuardados);
            updateMonstruoCards();
        }
    } catch (error) {
        console.error('Error cargando monstruos:', error);
    }
};

function updateMonstruoCards() {

    const monstruoContainer = document.getElementById('monstruo-container');
    monstruoContainer.innerHTML = ''; // Limpio el contenido actual

    if (monstruos.length > 0) {
        monstruos.forEach(monster => {
            // Creo una tarjeta para cada monstruo
            const monstruoCard = document.createElement('div');
            monstruoCard.classList.add('col-lg-4', 'col-md-6', 'col-12'); // Clases Bootstrap para la disposición de columnas
            monstruoCard.innerHTML = `
                <div class="card monstruo-card">
                    <img src=${definirIcono()} class="card-img-top" alt="icono-monstruo">
                    <div class="card-body">
                        <h2 class="card-title">${monster.nombre}</h2>
                        <p class="card-text">Alias: ${monster.alias}</p>
                        <p class="card-text">Defensa: ${monster.defensa}</p>
                        <p class="card-text">Miedo: ${monster.miedo}</p>
                        <p class="card-text">Tipo: ${monster.tipo}</p>
                    </div>
                </div>
            `;

            // Agrego la tarjeta al contenedor principal
            monstruoContainer.appendChild(monstruoCard);
        });
    } else {
        const noMonstruosCard = document.createElement('div');
        noMonstruosCard.classList.add('col-12');
        noMonstruosCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">No hay monstruos cargados</h2>
                </div>
            </div>
        `;

        // Agregar la tarjeta al contenedor principal
        monstruoContainer.appendChild(noMonstruosCard);
    }
    
}

function definirIcono(){

    let index = Math.floor(Math.random() * 14);
    return "./assets/ico/" + iconos[index];
}
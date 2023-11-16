    let monstruos = [];
    const tipos = ["Esqueleto", "Zombie", "Vampiro", "Fantasma", "Bruja", "Hombre Lobo"];
    const defensas = ["Pocion", "Crucifijo", "Estaca", "Plata"];
    let monstruosFiltrados = [];


    class Personaje {
        constructor(id, nombre, tipo) {
            this.id = id; //int
            this.nombre = nombre; // string
            this.tipo = tipo; //string ["Esqueleto", "Zombie", "Vampiro", "Fantasma", "Bruja", "Hombre Lobo"];
        }
    }

    class Monstruo extends Personaje {
        constructor(id, nombre, tipo, alias, miedo, defensa) {
            super(id, nombre, tipo);
            this.alias = alias; //string
            this.miedo = miedo; //int de 1 al 10
            this.defensa = defensa; //string ["Pocion", "Crucifijo", "Estaca", "Plata"]
        }
    }


    function mostrarLoader(mostrar){

        if(mostrar === false){
            loader.classList.add("oculto");
        }
        else{
            loader.classList.remove("oculto");
        }
    }

    // Hardcodeo el array de tipos y defensa en el localStorage
    if (!localStorage.getItem('Tipos')) {
        localStorage.setItem('Tipos', JSON.stringify(tipos));
    }

    if (!localStorage.getItem('Defensas')) {
        localStorage.setItem('Defensas', JSON.stringify(defensas));
    }

    // cargo los tipos del localStorage
    window.onload = function () {

        try {
            const tiposGuardados = localStorage.getItem('Tipos');
            if (tiposGuardados) {
                const tipos = JSON.parse(tiposGuardados);
                cargarOpcionesDropdown('tipo', tipos);
                
            }
        } catch (error) {
            console.error('Error loading tipos:', error);
        }

        // cargo los monstruos del localStorage
        ActualizarMonstruosDesdeLocalStorage();
        //los cargo en la table
        updateTable(monstruos);

        //seteo botones
        document.getElementById('guardar-btn').addEventListener('click', agregarMonstruo);
        document.getElementById('cancelar-btn').addEventListener('click', clearForm);
        document.getElementById('modificar-btn').addEventListener('click', modificarMonstruo);
        document.getElementById('eliminar-btn').addEventListener('click', eliminarMonstruo);

        cargarOpcionesFiltros();

        document.getElementById('filtrar-defensa-btn').addEventListener('click', aplicarFiltro);
        document.getElementById('filtrar-tipo-btn').addEventListener('click', aplicarFiltro);
        document.getElementById('quitar-filtro-btn').addEventListener('click', limpiarFiltros);

        document.getElementById('filtroDefensa').value = '';
        document.getElementById('filtroTipo').value = '';

    };

    function ActualizarMonstruosDesdeLocalStorage(){
        getMonstruos();
        const monstruosGuardados = localStorage.getItem('monstruos');
        if (monstruosGuardados) {
            monstruos = JSON.parse(monstruosGuardados);
        }
    }

    function GetIndiceFilaSelected() {
        const selectedLink = document.querySelector('.monster-cell a.selected');
        return selectedLink ? selectedLink.closest('tr').rowIndex - 1 : -1;
    }

    function clearForm() {
        document.getElementById('nombre').value = '';
        document.getElementById('alias').value = '';
        document.querySelector('input[name="defensa"]:checked').checked = false;
        document.getElementById('miedo').value = 0;
        document.getElementById('miedoValue').textContent = '0';
        document.getElementById('tipo').selectedIndex = 0;

        document.getElementById('guardar-btn').style.display = 'inline-block';
        document.getElementById('modificar-btn').style.display = 'none';
        document.getElementById('eliminar-btn').style.display = 'none';
    }

    function agregarMonstruo() {

        mostrarLoader(true);

        setTimeout(function agregarMonstruos(){

            if(document.querySelector('input[name="defensa"]:checked'))
            {
                const name = document.getElementById('nombre').value;
                const alias = document.getElementById('alias').value;
                const defensa = document.querySelector('input[name="defensa"]:checked').value;
                const miedo = document.getElementById('miedo').value;
                const tipo = document.getElementById('tipo').value;

                if(name === undefined || alias === undefined || defensa === undefined || miedo === undefined || tipo === undefined)
                {
                    mostrarErrorEnMain("Todos los datos del formulario son obligatorios");
                }
                else{
                    const newMonster = new Monstruo(Math.floor(Math.random() * (999 - 111 + 1)) + 1, name, tipo, alias, miedo, defensa);
                    postMonstruo(newMonster);
                    clearForm();
                    ActualizarMonstruosDesdeLocalStorage();
                    updateTable(monstruos);
                }
            }
            else{
                mostrarError("header","Todos los datos del formulario son obligatorios");
            }
            mostrarLoader(false);
        }, 2000);
    }

    function modificarMonstruo() {
        mostrarLoader(true);

        setTimeout(function agregarMonstruos(){

            const name = document.getElementById('nombre').value;
            const alias = document.getElementById('alias').value;
            const defensa = document.querySelector('input[name="defensa"]:checked').value;
            const miedo = document.getElementById('miedo').value;
            const tipo = document.getElementById('tipo').value;

            const rowIndex = GetIndiceFilaSelected();

            updatedMonstruo = new Monstruo(rowIndex + 1, name, tipo, alias, miedo, defensa);
            updateMonstruo(updatedMonstruo);
            ActualizarMonstruosDesdeLocalStorage();
            updateTable(monstruos);
            clearForm();
            mostrarLoader(false);
        }, 2000);
        
    }

    function eliminarMonstruo() {
        mostrarLoader(true);

        setTimeout(function agregarMonstruos(){

            const rowIndex = GetIndiceFilaSelected();

            if (rowIndex !== -1) {

                monstruo = monstruos[rowIndex];
                deleteMonstruo(monstruo.id);
                ActualizarMonstruosDesdeLocalStorage();
                updateTable(monstruos);
                clearForm();
            }
            mostrarLoader(false);
        }, 2000);
        
    }

    function updateTable(listaMonstruos) {

        const tableBody = document.querySelector('#monsterTable tbody');
        tableBody.innerHTML = '';

        listaMonstruos.forEach((monster, index) => {
            const row = tableBody.insertRow();
            const { id, nombre, alias, defensa, miedo, tipo } = monster;

            const cellName = row.insertCell(0);
            cellName.classList.add('monster-cell');
            const link = document.createElement('a');
            link.href = '#';
            link.classList.add('monster-link');
            link.textContent = nombre;

            link.setAttribute('data-index', index);

            cellName.appendChild(link);

            const cellAlias = row.insertCell(1);
            const cellDefensa = row.insertCell(2);
            const cellMiedo = row.insertCell(3);
            const cellTipo = row.insertCell(4);

            cellAlias.textContent = alias;
            cellDefensa.textContent = defensa;
            cellMiedo.textContent = miedo;
            cellTipo.textContent = tipo;
        });

        document.querySelectorAll('.monster-cell').forEach(cell => {
            cell.addEventListener('click', function () {
                // Elimino la clase 'selected' de todos los enlaces
                document.querySelectorAll('.monster-cell a').forEach(link => {
                    link.classList.remove('selected');
                });

                // Añado la clase 'selected' al enlace clicado
                this.querySelector('a').classList.add('selected');

                const rowIndex = parseInt(this.querySelector('a').getAttribute('data-index'));
                const selectedMonster = listaMonstruos[rowIndex];

                document.getElementById('nombre').value = selectedMonster.nombre;
                document.getElementById('alias').value = selectedMonster.alias;
                document.querySelector(`input[name="defensa"][value="${selectedMonster.defensa}"]`).checked = true;
                document.getElementById('miedo').value = selectedMonster.miedo;
                document.getElementById('miedoValue').textContent = document.getElementById('miedo').value;
                document.getElementById('tipo').value = selectedMonster.tipo;

                document.getElementById('guardar-btn').style.display = 'none';
                document.getElementById('modificar-btn').style.display = 'inline-block';
                document.getElementById('eliminar-btn').style.display = 'inline-block';
            });
        });
    }

    document.getElementById('miedo').addEventListener('input', function () {
        document.getElementById('miedoValue').textContent = this.value;
    });

    function mostrarError(sector, mensaje){
        if(sector === "header"){
            const newDiv = document.createElement("div");
            const newContent = document.createTextNode(mensaje);
            newDiv.appendChild(newContent);
            newDiv.id = "error-message";
            const currentDiv = document.getElementById("loader-section");
            document.body.insertBefore(newDiv, currentDiv);
        }
        else{
            const newDiv = document.createElement("div");
            const newContent = document.createTextNode(mensaje);
            newDiv.appendChild(newContent);
            newDiv.id = "error-message";
            const containerDiv = document.getElementsByClassName("container-fluid")[0];
            containerDiv.appendChild(newDiv);
        }
        
        setTimeout(()=>{
            const errorMessage = document.getElementById("error-message");
            if (errorMessage) {
                errorMessage.remove();
            }
        }, 5000);
    }

    function cargarOpcionesFiltros() {

        const defensas = JSON.parse(localStorage.getItem('Defensas')) || [];
        const tipos = JSON.parse(localStorage.getItem('Tipos')) || [];

        cargarOpcionesDropdown('filtroDefensa', defensas);
        cargarOpcionesDropdown('filtroTipo', tipos);
    }

    function cargarOpcionesDropdown(idDropdown, opciones) {
        const dropdown = document.getElementById(idDropdown);
        dropdown.innerHTML = '';

        opciones.forEach(opcion => {
            const option = document.createElement('option');
            option.value = opcion;
            option.textContent = opcion;
            dropdown.appendChild(option);
        });
    }

    function aplicarFiltro() {
        const filtroDefensa = document.getElementById('filtroDefensa').value;
        const filtroTipo = document.getElementById('filtroTipo').value;
    
        ActualizarMonstruosDesdeLocalStorage();
        if(filtroDefensa !== '' && filtroTipo !== ''){
            monstruosFiltrados = monstruos.filter(monstruo => monstruo.defensa === filtroDefensa);
            monstruosFiltrados = monstruos.filter(monstruo => monstruo.tipo === filtroTipo);
            updateTable(monstruosFiltrados);
        }
        else if (filtroDefensa !== '') {
            monstruosFiltrados = monstruos.filter(monstruo => monstruo.defensa === filtroDefensa);
            updateTable(monstruosFiltrados);
        } else if (filtroTipo !== '') {
            monstruosFiltrados = monstruos.filter(monstruo => monstruo.tipo === filtroTipo);
            updateTable(monstruosFiltrados);
        } else {
            mostrarError("filter", "¡No se encontraron monstruos con esas características!");
            updateTable(monstruos);
        }
    }

    function limpiarFiltros() {
        document.getElementById('filtroDefensa').value = '';
        document.getElementById('filtroTipo').value = '';
        monstruosFiltrados = [];
        console.log(monstruos);
        updateTable(monstruos);
    }



const inputNombre = document.getElementById('nombre');
const botonEjecutar = document.getElementById('buscar');
const altura = document.getElementById('altura');
const masa = document.getElementById('masa');
const peliculas = document.getElementById('peliculas'); // cambie peliculas en vez de items

async function buscarPersonaje() {
    
    const nombrePersonaje = inputNombre.value;
    const respuesta = await fetch(`https://swapi.dev/api/people/?search=${nombrePersonaje}`);
    
    const info = await respuesta.json();

    const personaje = info.results[0];

    if (personaje) {
        
        altura.innerText = personaje.height + " cm";
        masa.innerText = personaje.mass + " kg";

        peliculas.innerHTML = ''; 

        for (const urlPelicula of personaje.films) {
            
            const respuestaPelicula = await fetch(urlPelicula);
            const infoPelicula = await respuestaPelicula.json();

            const itemli = document.createElement('li');
            itemli.innerText = infoPelicula.title; 
            peliculas.appendChild(itemli);
        }

    } else {

        altura.innerText = 'No encontrado';
        masa.innerText = 'No encontrado';
        peliculas.innerHTML = '';
    }
}

botonEjecutar.addEventListener('click', e => {
    e.preventDefault(); 
    console.log("Buscando en SWAPI...");
    buscarPersonaje();
});
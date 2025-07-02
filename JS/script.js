const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonprev = document.querySelector('.btn-prev');
const buttonnext = document.querySelector('.btn-next');

let serchPokemon = 5;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
     pokemonName.innerHTML = 'Loading...';
     pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

if (data){
    pokemonImage.style.display = 'block'; // Mostra a imagem se achou
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
    ['animated']['front_default']
    input.value = '';
    serchPokemon = data.id;
    } 
    else {
        pokemonImage.style.display = 'none'; // Esconde a imagem se não achou
        pokemonName.innerHTML = 'Not Found :c'
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    renderPokemon(input.value.toLowerCase());
    
})

buttonprev.addEventListener('click', () => {
    serchPokemon -= 1;
    renderPokemon(serchPokemon)
});

buttonnext.addEventListener('click', () => {
    serchPokemon += 1;
    renderPokemon(serchPokemon)
});
    
renderPokemon(serchPokemon)



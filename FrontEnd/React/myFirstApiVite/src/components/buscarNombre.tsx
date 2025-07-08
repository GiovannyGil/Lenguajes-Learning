

async function buscarPorNombre() {
    const url = 'https://pokeapi.co/api/v2/pokemon/'
    try {
        const inputElement = document.getElementById('nombrePokemon') as HTMLInputElement | null;
            if (inputElement) {
            const nombrePokemon = inputElement.value;
            fetch(`${url}${nombrePokemon}`)
                .then(response => response.json())
                .then(data => {
                console.log('Nombre:', data.name);
                console.log('ID:', data.id);
                console.log('Tipos:', data.types.map((t: { type: { name: string } }) => t.type.name).join(', '));
                console.log('Imagen:', data.sprites.front_default);
                })
                .catch(error => console.error('Error:', error))
            } else {
            console.error('Input element not found');
            }
    } catch (error) {
        if (error instanceof Error) {
            console.log('error al buscar el Pokémon por nombre:', error.message);
        } else {
            console.log('error al buscar el Pokémon por nombre:', error);
        }
        throw new Error('Error al buscar el Pokémon por nombre', { cause: error });
    }
}

function Buscar() {
    return (
        <div>
            <h3>Buscar Pokémon por Nombre</h3>
            <form action="">
                <input type="text" name="nombrePokemon" id="nombrePokemon" />
            </form>
            <button onClick={() => buscarPorNombre()}>Buscar Pokémon</button>
        </div>
    )
}

export default Buscar;
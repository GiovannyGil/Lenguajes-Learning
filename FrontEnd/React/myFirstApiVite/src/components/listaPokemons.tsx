import React, { useEffect, useState } from 'react';
import '../styles/listaPokemons.css';

const ListarPokemons: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      const data = await response.json();
      // Fetch detallado e información de cada Pokémon
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const detailResponse = await fetch(pokemon.url);
          return await detailResponse.json();
        })
      );

      setPokemons(pokemonDetails);
    };
    fetchPokemons();
  }, []);

  return (
    <section className="main-section">
      <h2 className='titulo'>Pokemons</h2>
      <div className='contenedor'>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} className="card-main">
          {/* <img className='image' src={pokemon.sprites.front_default} alt={pokemon.name}/> */}
          <picture>
            <img className='image' src={pokemon.sprites.front_default} alt={pokemon.name} />
          </picture>
          <div className="card-content">
            <h3 className="nombreP">{pokemon.name}</h3>
            <ol className="habilidades">{pokemon.abilities.map((type: any, index: number) => (
              <li key={index}>
                {type.ability.name}
                {index < pokemon.abilities.length - 1 && ', '}
              </li>
            ))}</ol>
            <ol className="tipo"> 
              {pokemon.types.map((type: any, index: number) => (
                <li key={index}>
                  {type.type.name}
                  {index < pokemon.types.length - 1 && ', '}
                </li>
              ))}
            </ol>
          </div>
        </div>
        ))}
      </div>
    </section>
  );
};

export default ListarPokemons;
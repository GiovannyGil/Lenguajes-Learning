import React, { useEffect, useState } from 'react';

const ListarPokemons: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      // Replace with your actual fetch logic
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      const data = await response.json();
      setPokemons(data.results || []);
    };
    fetchPokemons();
  }, []);

  return (
    <div>
      <h2>Pokemons</h2>
      <ul>
        {pokemons.map((pokemon, idx) => (
          <li style={{listStyle: 'none',}} key={idx}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListarPokemons;
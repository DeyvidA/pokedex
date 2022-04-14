import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { getPokemonApi, getPokemonDatailsByUrlApi } from "../api/Pokemon";
import PokemonList from "../components/PokemonList";

export default function Pokedex() {
  const [pokemons, setPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  useEffect(() => {
    (async () => {
      await loadPokemon();
    })();
  }, []);

  const loadPokemon = async () => {
    try {
      const response = await getPokemonApi(nextUrl);
      setNextUrl(response.next);

      const pokemonArray = [];

      for await (const pokemon of response.results) {
        const pokemonDatails = await getPokemonDatailsByUrlApi(pokemon.url);

        pokemonArray.push({
          id: pokemonDatails.id,
          name: pokemonDatails.name,
          type: pokemonDatails.types[0].type.name,
          order: pokemonDatails.order,
          // image: pokemonDatails.sprites.front_shiny,
          image: pokemonDatails.sprites.other["official-artwork"].front_default,
        });
      }
      setPokemon([...pokemons, ...pokemonArray]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView>
      <PokemonList
        pokemons={pokemons}
        loadPokemon={loadPokemon}
        isNext={nextUrl}
      />
    </SafeAreaView>
  );
}

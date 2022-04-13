import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { getPokemonApi, getPokemonDatailsByUrlApi } from "../api/Pokemon";
import PokemonList from "../components/PokemonList";

export default function Pokedex() {
  const [pokemons, setPokemon] = useState([]);
  useEffect(() => {
    (async () => {
      await loadPokemon();
    })();
  }, []);

  const loadPokemon = async () => {
    try {
      const response = await getPokemonApi();

      const pokemonArray = [];

      for await (const pokemon of response.results) {
        const pokemonDatails = await getPokemonDatailsByUrlApi(pokemon.url);
        console.log(pokemonDatails);

        pokemonArray.push({
          id: pokemonDatails.id,
          name: pokemonDatails.name,
          type: pokemonDatails.types[0].type.name,
          order: pokemonDatails.order,
          image: pokemonDatails.sprites.front_shiny,
        });
      }
      setPokemon([...pokemons, ...pokemonArray]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView>
      <PokemonList pokemons={pokemons} />
    </SafeAreaView>
  );
}

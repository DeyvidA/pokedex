import { Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getPokemonDetailsApi } from "../api/Pokemon";
import Header from "../components/Pokemon/Header";

export default function Pokemon(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(params.id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);

  if (!pokemon) return null;

  return (
    <ScrollView>
      <Header
        name={pokemon.name}
        order={pokemon.order}
        image={pokemon.sprites.other["official-artwork"].front_default}
        type={pokemon.types[0].type.name}
      />
    </ScrollView>
  );
}
// image: pokemonDatails.sprites.front_shiny,
// image: pokemonDatails.sprites.other["official-artwork"].front_default,

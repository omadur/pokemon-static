import { NextPage } from "next";
import { GetStaticProps } from "next";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { Layout } from "../components/layouts/index";
import { pokeapi } from "../api";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from "@/components/pokemon";


interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout>
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
      </Grid.Container>
    </Layout>
  );
};

export default HomePage;

// Debería usar getStaticProps cuando:
//- Los datos necesarios para representar la página están disponibles en el momento de la compilación antes de la solicitud del usuario.
//- Los datos provienen de un CMS sin cabeza.
//- Los datos se pueden almacenar en caché públicamente (no específicos del usuario).
//- La página debe estar renderizada previamente (para SEO) y ser muy rápida: getStaticProps genera archivos HTML y JSON, los cuales pueden ser almacenados en caché por un CDN para el rendimiento.
// - Solo se puede utilizar GetStaticProps en las paginas, no en los componentes

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeapi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((poke, index) => ({
    ...poke,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`,
  }));

  return {
    props: { pokemons: pokemons },
  };
};

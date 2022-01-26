import Layout from '../components/Layout';
import Link from 'next/Link';

export default function Home({ pokemon }) {
  return (
    <Layout title="NextJS Pokedex">
      <h1 className="text-4xl mb-8 text-center"> NextJS Pokedex </h1>
        <ul>
          {pokemon.map((pokeman, index) => (
            <li key={index}>
              <Link href={`/pokemon?id=${index + 1}`}>
                <a className="border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md">
                  <img src={pokeman.image} alt={pokeman.name} className="w-20 h-20 mr-3"/>
                  <span className="mr-2 font-bold">{index + 1}.</span>
                  {pokeman.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
    </Layout>
  )
}

/* A função getStaticProps é uma função nativa do nextjs, ela é executada primeiro antes da página
ser recarregada com as suas recpectivas propriedades*/

export async function getStaticProps(context) {
  try {
    /*Api que retorna uma lista de 150 pokémons */
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const { results } = await res.json();

    const pokemon = results.map((result, index) => {
      //Adicionando 2 zeros na frente
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      /*Novo objeto https que recebe o atributos do objeto result desestruturado e a imagem do pokemon */
      https: return {
        ...result,
        image
      }
    });

    //Retornando o Pokemon
    return {
      props: { pokemon },
    }

  } catch (err) {
    console.log(err);
  }
}

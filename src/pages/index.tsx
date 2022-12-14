import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const food = trpc.useQuery(["food.getAll"])

  return (
    <>
      <Head>
        <title>Food Order for Optimal Delivery (FOOD)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Order Food
        </h1>
        <ul>
          { food.data && food.data.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home

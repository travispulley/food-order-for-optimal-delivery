import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { trpc } from '../../utils/trpc'

const Admin: NextPage = () => {
  const foodRef = React.useRef<HTMLInputElement>(null)

  const food = trpc.useQuery(["food.getAll"])
  const createFood = trpc.useMutation(["food.create"])

  const addFood = (e: React.FormEvent) => {
    e.preventDefault()

    createFood.mutate({
      name: foodRef.current?.value,
    }, { onSuccess: () => {
      if(foodRef.current)
        foodRef.current.value = ""
      food.refetch()
   } })
  }

  return (
    <>
      <Head>
        <title>FOOD Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Food
        </h1>
        <ul>
          { food.data && food.data.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
        <form>
        <p>Add food: <input type="text" placeholder="Food name" ref={foodRef} /> <button type="submit" onClick={addFood}>Add</button></p>
        </form>
      </main>
    </>
  )
}

export default Admin

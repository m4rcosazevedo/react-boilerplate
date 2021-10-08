import axios from 'axios'
import React from 'react'
import useSWR from 'swr'
import T from '@presentation/components/Translator/Translator'
import { Loading } from '@/shared/ui/loaders'

async function fetchPokemons (page = '') {
  const response = await axios.get(`https://pokeapi.co/api/v2/${page}`)
  return response.data
}

function usePokemons () {
  const search = 'pokemon?limit=10&offset=24'

  const { data, error } = useSWR(
    ['pokemon', search],
    async () => await fetchPokemons(search)
  )

  return {
    data, isLoading: !data && !error, error
  }
}

export function HomeShow () {
  const { data: pokemons, isLoading } = usePokemons()

  if (isLoading) return <h1>Loading</h1>

  return (
    <>
      <h1><T path="home.message" /></h1>

      <ul>
        {pokemons.results.map((item: any) => <li key={item.url}>{item.name}</li>)}
      </ul>

      <Loading />
    </>
  )
}

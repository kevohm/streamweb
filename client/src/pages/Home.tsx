import React from 'react'
import { useGetMovies } from '../features/movies/hooks'

const Home = () => {
    const resp = useGetMovies()
    console.log(resp)
  return (
    <div>Home</div>
  )
}

export default Home
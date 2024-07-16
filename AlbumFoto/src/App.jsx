import Fampliada from './components/Fampliada/Fampliada'
import FotoList from './components/FotoList/fotolist'
import SearchBar from './components/SearchBar/searchbar'
import axios from 'axios'

import "../src/index.css"
import { useEffect, useState } from 'react'

function App() {

  const [query , setQuery] = useState('')
  const [categoria , setCategoria] = useState('')
  const [fotos  , setFotos] = useState([])
  const [fotoAmpliada , setFotoAmpliada] = useState(null)
  const [activateSearch , setActivateSearch] = useState(false)
  
  const fetchData = async ({query , categoria}) => {
    const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY

    if (query || categoria) {
      let searchQuery = query

      if (query && categoria) {
        searchQuery = `${query} ${categoria}`
      } else {
        searchQuery = categoria
      }
      const response = await axios.get('https://api.unsplash.com/search/photos' , {
        params:{
          client_id: apiKey,
          query: searchQuery,
        }
      });

      setFotos(response.data.results)
    }

    setFotos(response.data)
  }

  useEffect(() => {
    fetchData( query , categoria)
  }, [])
  
  useEffect (() => {

    if (activateSearch) {
      fetchData({query , categoria})
      setActivateSearch(false)
    }

  }, [activateSearch])

  return (
    <div className="container">
        <SearchBar 
        setQuery={setQuery} 
        setCategoria={setCategoria}
         setActivateSearch={setActivateSearch}
         />

        <FotoList
         fotos={fotos} 
         setFotoAmpliada={setFotoAmpliada}
         />

        {fotoAmpliada && (
          <Fampliada 
          foto={fotoAmpliada} 
          setFotoAmpliada={setFotoAmpliada}
          />
        )}
    </div>  
  )
}

export default App

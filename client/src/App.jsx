import { useState,useEffect } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    axios.get("http://localhost:3005/")
    .then(response =>{
      setCount(response.data)
    })
  })

  return (
    <>
  <h1>{count}</h1>
    </>
  )
}

export default App

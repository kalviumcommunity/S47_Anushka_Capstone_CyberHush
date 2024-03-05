import { useState,useEffect } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [count, setCount] = useState()
  useEffect(() => {
    axios.get("http://localhost:3005/")
    .then(response =>{
      setCount(response.data)
    })
  })

  return (
    <>
  <h1 style={{fontSize:"100px",textAlign:"center",}}>{count}</h1>
    </>
  )
}

export default App

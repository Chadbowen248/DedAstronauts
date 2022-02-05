import Head from 'next/head'
import Header from '@components/Header'
import { useState } from 'react'



export default function Home() {
  const [astronautData, setAstronautData] = useState()
  const getDisplayQRcode = async () => {
    const url = "/test"
    const response = await fetch(url)
    const {results} = await response.json();
    setAstronautData(results)
    console.log(astronautData)
    
  }
  return (
    <div className="container">
      <Head>
        <title>DedAstronauts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="DedAstronauts" />
        <p className="description">Future home of DedAstronauts!!!</p>
        <img src='/preview.gif' style={{width: "50%"}}></img>
        <button onClick={() => getDisplayQRcode()}>Get Purchanse QR Code</button>
      </main>
    </div>
  )
}

import Head from 'next/head'
import Header from '@components/Header'
import { useState } from 'react'



export default function Home() {
  // const [data, setAstronautData] = useState()
  // const getDisplayQRcode = async () => {
  //   const url = "/.netlify/functions/test"
  //   const response = await fetch(url)
  //   const data = await response.json();
  //   setAstronautData(data)
  //   console.log(data)
    
  // }
  return (
    <div className="container">
      <Head>
        <title>DedAstronauts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="DedAstronauts" />
        <p className="description">Future home of DedAstronauts!!!</p>
        <img src='/preview.gif' style={{width: "70%"}}></img>
        <img src='/requestXRP.png' id="QRcode" style={{width: "50%"}}></img>
        {/* <button onClick={() => getDisplayQRcode()}>Get Purchanse QR Code</button> */}
      </main>
    </div>
  )
}

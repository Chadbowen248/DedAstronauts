import Head from 'next/head'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useState, useEffect } from 'react'
import Modal from "react-modal";




export default function Home() {
  const [data, setAstronautData] = useState()
  const [status, setStatus] = useState({})
  const [modalIsOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    if (data?.uuid) {
      const client = new W3CWebSocket(`${data?.refs?.websocket_status}`);
      client.onmessage = ({data}) => {
        const obj = JSON.parse(data)
        const keyCheck = obj.hasOwnProperty("expires_in_seconds")
        if (!keyCheck) {
          setStatus(obj)
        }
      };
    }
  }, [data]);

  useEffect(() => {
    if(status.opened) {
      setIsOpen(false)
    }
  },[status])

  const getDisplayQRcode = async () => {
    const url = "/.netlify/functions/test"
    const response = await fetch(url)
    const data = await response.json();
     setAstronautData(data) 
     setIsOpen(true)   
  }

  return (
    <div className="container">
      <Head>
      <link rel="stylesheet" href="https://use.typekit.net/mng4blu.css"></link>
        <title>DedAstronauts</title>
      </Head>

      <main>
        <h1>Ded Astronauts</h1>
        <h2>0/10,000 minted</h2>
        <h2 className="description">Future home of DedAstronauts!!!</h2>
        <p>{status.message}</p>
        {status.opened && <span>You have scanned the QR code with Xumm.</span>}
        {status.signed === false && <span>You declined ;( </span>}
          {/* add another && here after also verify on ledger */}
        {status.signed && <span>Transaction Verified! </span>} 
        <img src='/preview.gif' style={{width: "70%"}}></img>
        <button onClick={() => getDisplayQRcode()}>Get XUMM QR Code</button>
        {Modal.setAppElement('#__next')}
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-after",
          beforeClose: "overlay-before"
        }}
        className={{
          base: "content-base",
          afterOpen: "content-after",
          beforeClose: "content-before"
        }}
        closeTimeoutMS={500}
      >
        <div className='info-modal'>
        <img src={data?.refs?.qr_png} id="QRcode"></img>
        
        <p>Scan this code with the Xumm app to sign the transaction.</p>
        <p>Amount: 50 XRP</p>

        </div>
      </Modal>
      </main>
    </div>
  )
}

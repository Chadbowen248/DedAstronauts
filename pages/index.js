import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'





export default function Home() {
  const [agreeStatus, setAgreeStatus] = useState()

  const handleCheck = (e) => {
    const state = e.target.checked;
    if(state) {
      setAgreeStatus(true)
    } else {
      setAgreeStatus(false)
    }
   
   }

  return (
    <div className="container">
      <Head>
      <link rel="stylesheet" href="https://use.typekit.net/mng4blu.css"></link>
        <title>DedAstronauts</title>
      </Head>
      <main>
        <h1>Ded Astronauts</h1>
        <div className='howThisWorks'>
          <h2>How this works:</h2>
          <ul>
            <li>If you don't already have a XUMM account, download from the App or Play store and follow the registration process. Please note you will need at least 10 XRP to activate your account. For more info please see <a href="#">Xumm</a></li>
            <li>Accept a offer request for 1 Ded Astronaut a accept offer request sending 33 XRP to the DedAstronaut wallet by clicking on the "Get Xumm QR code" button and scanning the code with the Xumm app.</li>
            <li>Review and approve the request on the Xumm app.</li>
            <li>You can now mint a unique Ded Astronauts NFT to your xrpl address by clicking on the "Mint" button and scanning the QR code with Xumm.</li>
          </ul>
          <h2>Warnings:</h2>
          <ul>
            <li>Not resposible for loss of XRP. It's not like I can steal your XRP though, if something happens to go wrong and you're not able to mint message @DedAstronauts and we'll figure something out. I won't just take your XRP.</li>
            <li>Don't leave the page in the middle of the process, if you've sent your XRP, don't fuck off and do something else, not sure how to help.</li>
            <li>I realize the above sucks and is bad UX, but I'm just one person. Sorry.</li>
            <li>Full discloure, I've minted 500 of these ones because I can and they're rad.</li>
          </ul>
        </div>
        <div>
        <label htmlFor="poop">Check here to acknowledge that you've read and understand the above.</label>
        <input type="checkbox" name='poop' onChange={(e) => handleCheck(e)}></input>
        </div>
        {agreeStatus && <Link href="/ded"> 
          <a className='next-link'>Next</a> 
        </Link>}
      </main>
    </div>
  )
}

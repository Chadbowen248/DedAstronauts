import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
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
      </main>
    </div>
  )
}

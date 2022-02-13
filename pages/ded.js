import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import Head from "next/head";

export default function DedAstronaut() {
  const [data, setAstronautData] = useState();
  const [userNFT, setUserNFT] = useState();
  const [availableMintNumber, setMintNumber] = useState();
  const [verified, setVerified] = useState();
  const [status, setStatus] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [xmodalIsOpen, xsetIsOpen] = useState(false);

  useEffect(() => {
    getMintNumber()
  }, [availableMintNumber])

  useEffect(() => {
    if (data?.uuid) {
      const client = new W3CWebSocket(`${data?.refs?.websocket_status}`);
      client.onmessage = ({ data }) => {
        const obj = JSON.parse(data);
        const keyCheck = obj.hasOwnProperty("expires_in_seconds");
        const devapp = obj.hasOwnProperty("devapp_fetched");
        if (!keyCheck && !devapp) {
          setStatus(obj);
        }
      };
    }
  }, [data]);

  useEffect(() => {
    if (status?.payload_uuidv4 && status?.signed) {
      validate();
    }
  }, [status]);

  // Close modal QR after scan
  useEffect(() => {
    if (status.opened) {
      setIsOpen(false);
    }
  }, [status]);

  const getMintNumber = async () => {
    const url = "/.netlify/functions/getMintNumberAvailable";
    const response = await fetch(url);
    const data = await response.json();
    setMintNumber(data.numberMinted)
  }

  const mintDedAstronaut = async () => {
    const url = "/.netlify/functions/test";
    const response = await fetch(url);
    const data = await response.json();
    setAstronautData(data);
    setIsOpen(true);
  };
  // const signInAndDisplay = async () => {
  //   const url = "/.netlify/functions/signIn";
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   console.log(data)
  //   setAstronautData(data);
  //   setIsOpen(true);
  // };

  // const mintNFT = async () => {
  //   const url = "/.netlify/functions/mint";
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   setMint(data);
  //   alert("Mint stuff will happen now, no clue rn");
  // };

  const validate = async () => {
    const url = `/.netlify/functions/validate?uuid=${status?.payload_uuidv4}`;
    const response = await fetch(url);
    const data = await response.json();
    setVerified(data);
    if (status?.signed) {
      xsetIsOpen(true);
    }
    console.log("heres the validation", data);
  };

  return (
    <div className="container">
      <Head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/mng4blu.css"
        ></link>
        <title>DedAstronauts</title>
      </Head>

      <main>
        <h1>Ded Astronauts</h1>
        <h2>{`${(8888 - availableMintNumber) || 0}/8,888 minted`}</h2>
        {status.opened && !verified?.verifiedPayload?.hash && (
          <h3 className="verified">REVIEW AND SIGN WITH XUMM</h3>
        )}
        {status.signed === false && <h3 className="declined">SIGN DECLINED</h3>}

        <div className="preview-container">
          <img src="/preview.gif" style={{ width: "70%" }}></img>
          <button onClick={() => mintDedAstronaut()}>
            Mint a Ded Astronaut!
          </button>
        </div>
        {Modal.setAppElement("#__next")}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          overlayClassName={{
            base: "overlay-base",
            afterOpen: "overlay-after",
            beforeClose: "overlay-before",
          }}
          className={{
            base: "content-base",
            afterOpen: "content-after",
            beforeClose: "content-before",
          }}
          closeTimeoutMS={500}
        >
          <div className="info-modal">
            <img src={data?.refs?.qr_png} id="QRcode"></img>
            <p>Scan this code with the Xumm app to mint a Ded Astronaut.</p>
            <p>Amount: 33 XRP</p>
          </div>
        </Modal>
        <Modal
          isOpen={xmodalIsOpen}
          onRequestClose={() => xsetIsOpen(false)}
          overlayClassName={{
            base: "xoverlay-base",
            afterOpen: "xoverlay-after",
            beforeClose: "xoverlay-before",
          }}
          className={{
            base: "xcontent-base",
            afterOpen: "xcontent-after",
            beforeClose: "xcontent-before",
          }}
          closeTimeoutMS={500}
        >
          <div className="info-modal freshnft">
            {/* <img src={data?.refs?.qr_png} id="QRcode"></img> */}
            <h1>MINTED!</h1>
            <img src={data?.freshMint.formattedURI}></img>
            <span>
              <a
                target="_blank"
                href={`https://xrpscan.com/tx/${verified?.hash}`}
              >
                View TX
              </a>
            </span>
          </div>
        </Modal>
      </main>
    </div>
  );
}

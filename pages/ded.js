import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import Head from "next/head";

export default function DedAstronaut() {
  const [data, setAstronautData] = useState();
  const [mint, setMint] = useState();
  const [verified, setVerified] = useState();
  const [status, setStatus] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    if (status.opened) {
      setIsOpen(false);
    }
  }, [status]);

  const getDisplayQRcode = async () => {
    const url = "/.netlify/functions/test";
    const response = await fetch(url);
    const data = await response.json();
    setAstronautData(data);
    setIsOpen(true);
  };

  const mintNFT = async () => {
    const url = "/.netlify/functions/mint";
    const response = await fetch(url);
    const data = await response.json();
    setMint(data);
    alert("Mint stuff will happen now, no clue rn");
  };

  const validate = async () => {
    const url = `/.netlify/functions/validate?uuid=${status?.payload_uuidv4}`;
    const response = await fetch(url);
    const data = await response.json();
    setVerified(data);
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
        <h2>{`50${mint?.numberMinted || 0}/10,000 minted`}</h2>
        {(status.opened || status.signed) && !verified?.hash && (
          <h3 className="verified">REVIEW AND SIGN WITH XUMM</h3>
        )}
        {status.signed === false && <h3 className="declined">SIGN DECLINED</h3>}
        {verified?.hash && (
          <div className="status-container">
            <h3 className="verified">
              SIGN VERIFIED - READY TO MINT
              </h3>
              <span>
                <a target="_blank" href={`https://xrpscan.com/tx/${verified?.hash}`}>View TX</a>
              </span>
     
          </div>
        )}
        <div className="preview-container">
          <img src="/preview.gif" style={{ width: "70%" }}></img>
          {(status.signed === undefined || status.signed === false) && (
            <button onClick={() => getDisplayQRcode()}>Get XUMM QR Code</button>
          )}
          {status.signed === true && verified?.hash && (
            <button onClick={() => mintNFT()}>Mint</button>
          )}
        </div>
        {/* <button onClick={() => validate()}>verify</button> */}
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

            <p>Scan this code with the Xumm app to sign the transaction.</p>
            <p>Amount: 50 XRP</p>
          </div>
        </Modal>
      </main>
    </div>
  );
}

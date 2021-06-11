import { useState } from "react";
import dynamic from "next/dynamic";
import Head from 'next/head'
import * as React from "react"

export default function PrivatePage(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
    }
  };

  const MapWithNoSSR = dynamic(() => import("../components/DatosM"), {
    ssr: false
  })

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/file", {
      method: "POST",
      body
    });
  };

  return (
    <div className="container">
       <Head>
        <title>Formulario de Audio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="title">
            Información del Audio
          </h1>
      <main>
        <div id="map" className="Mapa">
          
        <a>
            <h3>Valdivia</h3>
          </a>
          <MapWithNoSSR />
        </div>

        <div className="Formulario">
          

          <a className="card">
            <h3>Nombre del Audio:</h3>
          </a>
          <input 
            type="nomAudio"
            placeholder="nombre audio"
          />

          <a className="card">
            <h3>Latitud y longitud:</h3>
          </a>
          <input 
            type="lat"
            placeholder="latitud"
          />
          <input 
            type="lon"
            placeholder="longitud"
          />

          <a className="card">
            <h3>Fecha de grabación DD/MM/YYYY</h3>
          </a>
          <input 
            type="fecha"
            placeholder="DD/MM/YYYY"
          />

          <a className="card">
            <h3>Fuentes Sonoras presentes</h3>
          </a>
          <input 
            type="fecha"
            placeholder="Indicar fuentes sonoras"
          />

          <a className="card">
            <h3>Descripción</h3>
          </a>
          <input 
            type="descr"
            placeholder="El audio trata sobre.."
          />
          

          

        </div>
        

      </main>
      <h4>Subida de Audio</h4>
        <input type="file" name="myImage" onChange={uploadToClient} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >Subir</button>
      
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: left;
          border: 5px solid #eaeaea;
          width: 1250px;
          max-height: 940px;
        }
        
        .Formulario{
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: left;
          border: 5px solid #eaeaea;
        }
        .Mapa {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 700px;
          height: 1000px;
          max-height: 5000px;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          line-height: 3;
          width: 100%;
          font-size: 2rem;
          border: 4px solid #eaeaea;
          border-radius: 1px;
        }

        .title,
        .description {
          text-align: center;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

    </div>
  );
}
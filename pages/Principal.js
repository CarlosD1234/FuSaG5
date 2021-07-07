import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import * as React from "react";

const MapWithNoSSR = dynamic(() => import("../components/DatosM").then((v) => v.Map), {
  ssr: false,
});

export default function Principal() {
  return (
    <div className="container">
      <Head>
        <title>Sistema FuSA Valdivia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="title">FuSA Valdivia</h1>
      <main>
        <div className="grid">
          <div className="Mapa" id="map">
            <MapWithNoSSR />
          </div>
        </div>
      </main>

      <footer>
        <a href="/Subidas" className="card">
          <h3>Subir Audio &rarr;</h3>
        </a>
      </footer>
      <style jsx>{`
        main {
          flex: 1;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .title {
          line-height: 5;
          font-size: 2rem;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .card {
          flex-basis: 40%;
          padding: 0.5rem;
          text-align: center;
          color: inherit;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          border: 5px solid #eaeaea;
          border-radius: 20px;
          transition: color 0.15s ease, border-color 0.15s ease;

          max-width: 300px;
        }
        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

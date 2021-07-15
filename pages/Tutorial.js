import Head from "next/head";
export default function Tutorial() {
  //Se muestra un tutorial simple de como subir un archivo al sistema FuSa.
    return <div className="container">
    <Head>
      <title>Tutorial</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1 className="title">¿Cómo subir tu archivo correctamente?</h1>
    <img src="/tutorial.png" alt="Imagen tutorial" className="tutorial" />
    <footer>
      <a href="/" className="card">
        <h3>Volver al inicio &rarr;</h3>
      </a>
    </footer>
    </div>
}
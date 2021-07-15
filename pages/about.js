import Head from "next/head"; 
export default function About() {
  //Nombre de los integrantes, además de un enlace a su perfil de GitHub.
  return <div>
  
    <Head>
      <title>Acerca de</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1 className="title">Acerca de</h1><br />
    <h2>Integrantes y perfil de Github:</h2>
    <a href="https://github.com/FederalTN">José Aillapi</a><br />
    <a href="https://github.com/alexbgh1">Alex Garnica</a><br />
    <a href="https://github.com/CarlosD1234">Carlos Duarte</a><br />
    <iframe width="420" height="315"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1">
    </iframe>
  </div>
}
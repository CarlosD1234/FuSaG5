import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

const MapWithNoSSR = dynamic(() => import("../components/DatosM").then((v) => v.Map), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Valdivia</title>
      </Head>

      <main>
        <div id="map">
          <MapWithNoSSR />
        </div>
      </main>
    </div>
  );
}

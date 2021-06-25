import { useState } from "react";
import { Box, Flex, Heading, Stack, Input, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";

const MapWithNoSSR = dynamic(() => import("../components/DatosM").then((v) => v.Map), {
  ssr: false,
});

const Card = ({ children }) => {
  return (
    <Box
      margin="1em"
      flexBasis="45%"
      padding="1.5rem"
      textAlign="left"
      color="inherit"
      textDecoration="none"
      transition="color 0.15s ease, border-color 0.15s ease"
    >
      {children}
    </Box>
  );
};

export default function PrivatePage(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    Respuestas.ArchivoNom = image.name;
    const response = await fetch("/api/file", {
      method: "POST",
      body
    });
  };

  function Coordenadas(event) {
    setPosition(event.latlng);
  }

  const [position, setPosition] = useState({lat:-39.8139, lng: -73.2458})

  const ValorNom = (event) => {
    Respuestas.AudioNom = event.target.value;
    console.log(Respuestas.AudioNom);
  }

  const ValorFecha = (event) => {
    Respuestas.FechaGrabacion = event.target.value;
  }

  const ValorFuentes = (event) => {
    Respuestas.FuentesSonoras = event.target.value;
  }

  const ValorDesc = (event) => {
    Respuestas.Descripcion = event.target.value;
  }

  const Respuestas = {
    AudioNom: String,
    latitud: position.lat,
    longitud: position.lng,
    FechaGrabacion: String,
    FuentesSonoras: String,
    Descripcion: String,
    ArchivoNom: String
  }
  const {toggleColorMode} = useColorMode()
  return (
    <div className="container">
      <Head>
        <title>Formulario de Audio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="title">Información del Audio       
      <Button onClick={toggleColorMode}>Tema</Button>
      </h1>
      <Box
        as="main"
        display="flex"
        justifyContent="center"
        alignItems="left"
        border="5px solid #eaeaea"
        width="1250px"
        maxHeight="940px"
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          width="700px"
          height="1000px"
          maxHeight="5000px"
        >
          <Heading as="h3" fontSize="1.5em" marginLeft="0.5em">
            Valdivia
          </Heading>

          <MapWithNoSSR onClick={ Coordenadas }/>
        </Flex>

        <Stack
          flex="1"
          padding="5rem 0"
          justifyContent="center"
          alignItems="left"
          border="5px solid #eaeaea"
          spacing="0.3em"
        >
          <Card>
            <Heading as="h3" fontSize="1.5em">
              Nombre del Audio:
            </Heading>
          </Card>
          <Input type="nomAudio" placeholder="nombre audio" onChange = { ValorNom }/>

          <Card>
            <Heading as="h3" fontSize="1.5em">
              Latitud: {position.lat}<br />longitud: {position.lng}
            </Heading>
          </Card>
          
          <Card>
            <Heading as="h3" fontSize="1.5em">
              Fecha de grabación DD/MM/YYYY
            </Heading>
          </Card>
          <Input type="fecha" placeholder="DD/MM/YYYY" onChange = { ValorFecha }/>

          <Card>
            <Heading as="h3" fontSize="1.5em">
              Fuentes Sonoras presentes
            </Heading>
          </Card>
          <Input type="fecha" placeholder="Indicar fuentes sonoras" onChange = { ValorFuentes }/>

          <Card>
            <Heading as="h3" fontSize="1.5em">
              Descripción
            </Heading>
          </Card>
          <Input type="descr" placeholder="El audio trata sobre.." onChange = { ValorDesc }/>
        </Stack>
      </Box>
      
      <h4>Subida de Audio</h4>
      <Input type="file" name="myImage" onChange={uploadToClient} />
      <button className="btn btn-primary" type="submit" onClick={uploadToServer}>
        Subir
      </button>
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
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
            Bitstream Vera Sans Mono, Courier New, monospace;
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

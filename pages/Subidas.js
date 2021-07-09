import { useState, useEffect } from "react";
import { Box, Flex, Heading, Stack, Input, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";
import axios from "axios";
import { Formulario, Label, GrupoInput, LeyendaError, IconoValidacion } from "../components/formularios1";
import ComponenteInput from '../components/Input1';

const MapWithNoSSR = dynamic(() => import("../components/DatosM").then((v) => v.Map), {
  ssr: false,
});

const Card = ({ children }) => {
  return (
    <Box
      margin="0em"
      flexBasis="45%"
      padding="1rem"
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
  const [data, setData] = useState();

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
    }
    console.log(nomAudio.campo);
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    archivoNom.campo = image.name;
    const response = await fetch("/api/file", {
      method: "POST",
      body
    });
    subirRespuestas(setData);
  };

  function Coordenadas(event) {
    setPosition(event.latlng);
  }

  const [position, setPosition] = useState({lat:-39.8139, lng: -73.2458})

  async function subirRespuestas(setData) {
  
    try {
      const response = await axios.post("/api/Textos", {
        name: `./Audios/${nomAudio.campo}.txt`,
        data: 
        nomAudio.campo       + "\n" + 
        position.lat        + "\n" + 
        position.lng       + "\n" + 
        dia.campo + " / " + mes.campo + " / " + anio.campo + "\n" +
        horas.campo + " / " + minutos.campo + " / " + segundos.campo + "\n" +
        fuenteSonora.campo + "\n" + 
        descripcion.campo    + "\n" + 
        archivoNom.campo
      });
  
      setData(response.data);
    } catch (err) {
      setData(err.message);
    }
  }

  const ValorNom = (event) => {
    nomAudio.campo = event.target.value;
    console.log(nomAudio.campo);
  }

//Fechas
  const ValorDia = (event) => {
    dia.campo = event.target.value;
  }

  const ValorMes = (event) => {
    mes.campo = event.target.value;
  }

  const ValorAnio = (event) => {
    anio.campo = event.target.value;
  }
//Hora
const ValorSegundos = (event) => {
  segundos.campo = event.target.value;
}
const ValorMinutos = (event) => {
  minutos.campo = event.target.value;
}
const ValorHoras = (event) => {
  horas.campo = event.target.value;
}

  const ValorFuentes = (event) => {
    fuenteSonora.campo = event.target.value;
  }

  const ValorDesc = (event) => {
    descripcion.campo = event.target.value;
  }


	const [nomAudio, cambiarNomAudio] = useState({campo: '', valido: null});

	const [latT, cambiarLat] = useState({campo: '', valido: null});
	const [lonN, cambiarLon] = useState({campo: '', valido: null});

  const [dia, cambiarDia] = useState({campo: '', valido: null});
  const [mes, cambiarMes] = useState({campo: '', valido: null});
  const [anio, cambiarAnio] = useState({campo: '', valido: null});

  const [minutos, cambiarMinutos] = useState({campo: '', valido: null});
  const [horas, cambiarHoras] = useState({campo: '', valido: null});
  const [segundos, cambiarSegundos] = useState({campo: '', valido: null});

  const [fuenteSonora, cambiarFuenteSonora] = useState({campo: '', valido: null});
	const [descripcion, cambiarDescripcion] = useState({campo: '', valido: null});
	const [archivoNom, cambiarArchivoNom] = useState({campo: '', valido: null});

	const [formularioValido, cambiarFormularioValido] = useState(null);

	const expresiones = {
		nomAudio: /^[a-zA-Z0-9_-]{4,12}$/, // Letras, numeros, guion y guion_bajo
		fuenteSonora: /^[a-zA-ZÀ-ÿ,._\s]{4,16}$/, // Letras y espacios, pueden llevar acentos.
		lat: /^[Z0-9.]{1,6}$/, // 1 a 5 digitos.
		lon: /^[Z0-9.]{1,6}$/,

		dia: /^[Z0-9/]{2}$/, //DD
    mes: /^[Z0-9/]{2}$/, //MM
    anio: /^[Z0-9/]{4}$/, //YYYY

    minutos:/^[Z0-9/:]{2}$/,
    horas:/^[Z0-9/:]{2}$/,
    segundos:/^[Z0-9/:]{2}$/,

		descripcion: /^[a-zA-ZÀ-ÿ\s]{4,40}$/
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
      
      <h4>Subida de Audio</h4>
        <div>
          <Input type="file" name="myImage" onChange={uploadToClient} />
        </div>

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
          padding="0rem 0"
          justifyContent="center"
          alignItems="left"
          border="0px solid #eaeaea"
          spacing="0.3em"
        >
          <Card>
            <Heading as="h3" fontSize="1.5em">
              Nombre del Audio:
            </Heading>
          </Card>
          <ComponenteInput 
            estado={nomAudio}
            cambiarEstado={cambiarNomAudio}
            tipo="text"
            //label="Nombre del audio"
            placeholder="audio_1"
            name="nomAudio"
            leyendaError="Error, debe ingresar un nombre válido. Entre 4 y 12 caracteres."
            expresionRegular={expresiones.nomAudio}
            onChange = { ValorNom }
          />

          <Card>
            <Heading as="h3" fontSize="1.5em">
              Latitud: {position.lat}<br />Longitud: {position.lng}
            </Heading>
          </Card>
          
          <Card>
            <Heading as="h3" fontSize="1.5em">
              Fecha de grabación DD/MM/YYYY
            </Heading>
          </Card>

          <Flex>
            <ComponenteInput 
              estado={dia}
              cambiarEstado={cambiarDia}
              tipo="text"
              placeholder="DD"
              name="dia"
              leyendaError="Debe tener forma DD."
              expresionRegular={expresiones.dia}
              onChange = { ValorDia }
            />
            <Heading width="20px">
                / 
            </Heading>
            <ComponenteInput 
              estado={mes}
              cambiarEstado={cambiarMes}
              tipo="text"
              placeholder="MM"
              name="mes"
              leyendaError="Debe tener forma MM."
              expresionRegular={expresiones.mes}
              onChange = { ValorMes }
            />
            <Heading width="20px">
                / 
            </Heading>
            <ComponenteInput 
              estado={anio}
              cambiarEstado={cambiarAnio}
              tipo="text"
              placeholder="YYYY"
              name="anio"
              leyendaError="Debe tener forma YYYY."
              expresionRegular={expresiones.anio}
              onChange = { ValorAnio }
            />

          </Flex>

          <Card>
            <Heading as="h3" fontSize="1.5em">
              Hora de grabación
            </Heading>
          </Card>

          <Flex>
            <ComponenteInput  
              estado={horas}
              cambiarEstado={cambiarHoras}
              tipo="text"
              placeholder="00"
              name="horas"
              leyendaError="Debe tener forma 00."
              expresionRegular={expresiones.horas}
              onChange = { ValorHoras } 
            />
            <Heading width="20px">
                : 
            </Heading>
            <ComponenteInput  
              estado={segundos}
              cambiarEstado={cambiarMinutos}
              tipo="text"
              placeholder="00"
              name="minutos"
              leyendaError="Debe tener forma 00."
              expresionRegular={expresiones.minutos}
              onChange = { ValorMinutos } 
            />
            <Heading width="20px">
                : 
            </Heading>
            <ComponenteInput  
              estado={segundos}
              cambiarEstado={cambiarSegundos}
              tipo="text"
              placeholder="00"
              name="segundos"
              leyendaError="Debe tener forma 00."
              expresionRegular={expresiones.segundos}
              onChange = { ValorSegundos } 
            />
          </Flex>

          <Card>
            <Heading as="h3" fontSize="1.5em">
              Fuentes Sonoras presentes
            </Heading>

          </Card>
            <ComponenteInput  
              estado={fuenteSonora}
              cambiarEstado={cambiarFuenteSonora}
              tipo="text"
              //label="Fuente sonora"
              placeholder="Autos"
              name="fuente_sonora"
              leyendaError="El formulario debe tener de 4 a 16 caracteres, además no se permiten números."
              expresionRegular={expresiones.fuenteSonora}
              onChange = { ValorFuentes } valido={fuenteSonora.valido}
            />
          <Card>

            <Heading as="h3" fontSize="1.5em">
              Descripción
            </Heading>
          </Card>
          <ComponenteInput  
					estado={descripcion}
					cambiarEstado={cambiarDescripcion}
					tipo="text"
					//label="Descripcion"
					placeholder="El audio trata sobre..."
					name="descripcion"
					leyendaError="Ingrese una sentencia mayor a 4 letras y menor a 40."
					expresionRegular={expresiones.descripcion}
            onChange = { ValorDesc }/>
        </Stack>
      </Box>
      
      
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

        .btn {
          border: 8px solid #eaeaea;
          width: 500px;
          transition: color 0.15s ease, border-color 0.15s ease;
          margin: 2rem;
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

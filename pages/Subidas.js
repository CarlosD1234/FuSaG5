import { useState } from "react";
import { Box, Flex, Heading, Stack, Input, Button, useColorMode} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Select from 'react-select'
import axios from "axios";
import ComponenteInput from '../components/Input1';
/*
Se encarga del funcionamiento general de la pagina que contiene los formularios, almacenando la informacion,
pudiendo seleccionar en el mapa y escribiendo distintos valores para el archivo a subir.
*/
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
        diass.value + " / " + mesess.value + " / " + anioss.value + "\n" +
        horass.value + " / " + minutoss.value + " / " + segundoss.value + "\n" +
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
    console.log(ValorDia);
    dia.campo = event.target.value;
  }

  const ValorFuentes = (event) => {
    fuenteSonora.campo = event.target.value;
  }

  const ValorDesc = (event) => {
    descripcion.campo = event.target.value;
  }


	const [nomAudio, cambiarNomAudio] = useState({campo: '', valido: null});

  const dias=[
    { value: '1', label: '1'},
    { value: '2', label: '2'},
    { value: '3', label: '3'},
    { value: '4', label: '4'},
    { value: '5', label: '5'},
    { value: '6', label: '6'},
    { value: '7', label: '7'},
    { value: '8', label: '8'},
    { value: '9', label: '9'},
    { value: '10', label: '10'},
    { value: '11', label: '11'},
    { value: '12', label: '12'},
    { value: '13', label: '13'},
    { value: '14', label: '14'},
    { value: '15', label: '15'},
    { value: '16', label: '16'},
    { value: '17', label: '17'},
    { value: '18', label: '18'},
    { value: '19', label: '19'},
    { value: '20', label: '20'},
    { value: '21', label: '21'},
    { value: '22', label: '22'},
    { value: '23', label: '23'},
    { value: '24', label: '24'},
    { value: '25', label: '25'},
    { value: '26', label: '26'},
    { value: '27', label: '27'},
    { value: '28', label: '28'},
    { value: '29', label: '29'},
    { value: '30', label: '30'},
    { value: '31', label: '31'}
  ]
  const [diass, setDias] = useState(null);
  const diasChange = (value) => {
    setDias(value);
    console.log(value);
  }

  const [mesess, setMeses] = useState(null);
  const meses=[
    { value: '1', label: 'Enero'},
    { value: '2', label: 'Febrero'},
    { value: '3', label: 'Marzo'},
    { value: '4', label: 'Abril'},
    { value: '5', label: 'Mayo'},
    { value: '6', label: 'Junio'},
    { value: '7', label: 'Julio'},
    { value: '8', label: 'Agosto'},
    { value: '9', label: 'Septiembre'},
    { value: '10', label: 'Octubre'},
    { value: '11', label: 'Noviembre'},
    { value: '12', label: 'Diciembre'}
  ]
const mesesChange = (value) => {
  setMeses(value);
  console.log(value);
}
  const [anioss, setAnios] = useState(null);
  const anios=[
    { value: '2015', label: '2015'},
    { value: '2016', label: '2016'},
    { value: '2017', label: '2017'},
    { value: '2018', label: '2018'},
    { value: '2019', label: '2019'},
    { value: '2020', label: '2020'},
    { value: '2021', label: '2021'}
  ]
const aniosChange = (value) => {
  setAnios(value);
  console.log(value);
}
  const [minutoss, setMinutos] = useState(null);
  const minutos=[
    { value: '1', label: '1'},    { value: '2', label: '2'},    { value: '3', label: '3'},    { value: '4', label: '4'},
    { value: '5', label: '5'},    { value: '6', label: '6'},    { value: '7', label: '7'},    { value: '8', label: '8'},
    { value: '9', label: '9'},    { value: '10', label: '10'},    { value: '11', label: '11'},    { value: '12', label: '12'},    { value: '13', label: '13'},
    { value: '14', label: '14'},    { value: '15', label: '15'},    { value: '16', label: '16'},    { value: '17', label: '17'},
    { value: '18', label: '18'},    { value: '19', label: '19'},    { value: '20', label: '20'},    { value: '21', label: '21'},
    { value: '22', label: '22'},    { value: '23', label: '23'},    { value: '24', label: '24'},    { value: '25', label: '25'},
    { value: '26', label: '26'},    { value: '27', label: '27'},    { value: '28', label: '28'},    { value: '29', label: '29'},
    { value: '30', label: '30'},    { value: '31', label: '31'},    { value: '32', label: '32'},    { value: '33', label: '33'},
    { value: '34', label: '34'},    { value: '35', label: '35'},    { value: '36', label: '36'},    { value: '37', label: '37'},
    { value: '38', label: '38'},    { value: '39', label: '39'},    { value: '40', label: '40'},    { value: '41', label: '41'},
    { value: '42', label: '42'},    { value: '43', label: '43'},    { value: '44', label: '44'},    { value: '45', label: '45'},
    { value: '46', label: '46'},    { value: '47', label: '47'},    { value: '48', label: '48'},    { value: '49', label: '49'},
    { value: '50', label: '50'},    { value: '51', label: '51'},    { value: '52', label: '52'},    { value: '53', label: '53'},
    { value: '54', label: '54'},    { value: '55', label: '55'},    { value: '56', label: '56'},    { value: '57', label: '57'},
    { value: '58', label: '58'},    { value: '59', label: '59'}
  ]

const minutosChange = (value) => {
  setMinutos(value);
  console.log(value);
}


const horas=[
  { value: '0', label: '0'},  { value: '1', label: '1'},    { value: '2', label: '2'},    { value: '3', label: '3'},    { value: '4', label: '4'},
  { value: '5', label: '5'},    { value: '6', label: '6'},    { value: '7', label: '7'},    { value: '8', label: '8'},
  { value: '9', label: '9'},    { value: '10', label: '10'},    { value: '11', label: '11'},    { value: '12', label: '12'},    { value: '13', label: '13'},
  { value: '14', label: '14'},    { value: '15', label: '15'},    { value: '16', label: '16'},    { value: '17', label: '17'},
  { value: '18', label: '18'},    { value: '19', label: '19'},    { value: '20', label: '20'},    { value: '21', label: '21'},
  { value: '22', label: '22'},    { value: '23', label: '23'}
]

const [horass, setHoras] = useState(null);
const horasChange = (value) => {
setHoras(value);
console.log(value);
}

  const segundos=[
    { value: '1', label: '1'},    { value: '2', label: '2'},    { value: '3', label: '3'},    { value: '4', label: '4'},
    { value: '5', label: '5'},    { value: '6', label: '6'},    { value: '7', label: '7'},    { value: '8', label: '8'},
    { value: '9', label: '9'},    { value: '10', label: '10'},    { value: '11', label: '11'},    { value: '12', label: '12'},    { value: '13', label: '13'},
    { value: '14', label: '14'},    { value: '15', label: '15'},    { value: '16', label: '16'},    { value: '17', label: '17'},
    { value: '18', label: '18'},    { value: '19', label: '19'},    { value: '20', label: '20'},    { value: '21', label: '21'},
    { value: '22', label: '22'},    { value: '23', label: '23'},    { value: '24', label: '24'},    { value: '25', label: '25'},
    { value: '26', label: '26'},    { value: '27', label: '27'},    { value: '28', label: '28'},    { value: '29', label: '29'},
    { value: '30', label: '30'},    { value: '31', label: '31'},    { value: '32', label: '32'},    { value: '33', label: '33'},
    { value: '34', label: '34'},    { value: '35', label: '35'},    { value: '36', label: '36'},    { value: '37', label: '37'},
    { value: '38', label: '38'},    { value: '39', label: '39'},    { value: '40', label: '40'},    { value: '41', label: '41'},
    { value: '42', label: '42'},    { value: '43', label: '43'},    { value: '44', label: '44'},    { value: '45', label: '45'},
    { value: '46', label: '46'},    { value: '47', label: '47'},    { value: '48', label: '48'},    { value: '49', label: '49'},
    { value: '50', label: '50'},    { value: '51', label: '51'},    { value: '52', label: '52'},    { value: '53', label: '53'},
    { value: '54', label: '54'},    { value: '55', label: '55'},    { value: '56', label: '56'},    { value: '57', label: '57'},
    { value: '58', label: '58'},    { value: '59', label: '59'}
  ]

const [segundoss, setSegundos] = useState(null);
const segundosChange = (value) => {
  setSegundos(value);
  console.log(value);
}

  const [fuenteSonora, cambiarFuenteSonora] = useState({campo: '', valido: null});
	const [descripcion, cambiarDescripcion] = useState({campo: '', valido: null});
	const [archivoNom, cambiarArchivoNom] = useState({campo: '', valido: null});

	const [formularioValido, cambiarFormularioValido] = useState(null);

	const expresiones = {
		nomAudio: /^[a-zA-Z0-9_-]{4,12}$/, // Letras, numeros, guion y guion_bajo
		fuenteSonora: /^[a-zA-ZÀ-ÿ,._\s]{4,16}$/, // Letras y espacios, pueden llevar acentos.
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

          <Flex
            padding="1em"
            justifyContent= 'space-between'
            >
            <Select
              style={{width:"200px"}}
              value={diass}
              options={dias}
              onChange={diasChange}
            />

            <Select
              style={{width:"200px"}}
              value={mesess}
              options={meses}
              onChange={mesesChange}
            />

            <Select
              style={{width:"200px"}}
              value={anioss}
              options={anios}
              onChange={aniosChange}
            />

          </Flex>

          <Card>
            <Heading as="h3" fontSize="1.5em">
              Hora de grabación hh:mm:ss
            </Heading>
          </Card>


          <Flex 
            padding="1em"
            justifyContent= 'space-between'
            >

            <Select 
              style={{width:"200px"}}
              value={horass}
              options={horas}
              onChange={horasChange}
            />
            <Select
              style={{width:"200px"}}
              value={minutoss}
              options={minutos}
              onChange={minutosChange}
            />

            <Select
              style={{width:"200px"}}
              value={segundoss}
              options={segundos}
              onChange={segundosChange}
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

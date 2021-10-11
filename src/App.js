import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cancion from './components/Cancion';
import Info from './components/Info';
import Error from './components/Error';


function App() {

  // Definiendo el state 
  const [busquedaletara, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});
  const [error, guardarError] = useState(false);

  useEffect(() => {
    if (Object.keys(busquedaletara).length === 0) return;

    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaletara;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
      const url2 = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      Promise.all([
        axios(url),
        axios(url2)
      ]).then(data => {
        guardarLetra(data[0].data.lyrics);
        guardarInfo(data[1].data.artists[0]);
        return;
      }).catch(() => {
        guardarError(true);
        return;
      });
    }
    guardarError(false);
    consultarApiLetra();
  }, [busquedaletara]);

  return (
    <Fragment>
      <Formulario
        guardarBusquedaLetra={guardarBusquedaLetra}
      />

      <div className="container mt-5">
        <div className="row">
          {error ? <Error mensaje="No pudimos encontrar lo que buscas intentalo otra ves!" /> : null}
          <div className="col-md-6">
            <Info
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

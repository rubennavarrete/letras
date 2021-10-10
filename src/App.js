import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cancion from './components/Cancion';


function App() {

  // Definiendo el state 
  const [busquedaletara, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState('');

  useEffect(() => {
    if (Object.keys(busquedaletara).length === 0) return;

    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaletara;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`

      const resultado = await axios(url);
      guardarLetra(resultado.data.lyrics);
    }
    consultarApiLetra();
  }, [busquedaletara]);

  return (
    <Fragment>
      <Formulario
        guardarBusquedaLetra={guardarBusquedaLetra}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">Artista</div>
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

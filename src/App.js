import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario.js'
import ListarImagenes from './components/ListarImagenes.js'

function App() {

  // State del a app
  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  const [totalpaginas, guardarTotalPaginas ] = useState(1);



  useEffect( () => {

    const ConsultarApi = async() => {

      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '18521325-3e0bddfab7af9a95b4dfb1907';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;


      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      guardarImagenes(resultado.hits);

      // Calcular el total de paginas
      const CalcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina );
      guardarTotalPaginas(CalcularTotalPaginas);

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({behavior: 'smooth'})
    }
    ConsultarApi()
  },[busqueda, paginaactual])

    // Definir la pagina anterior
    const PaginaAnterior = () => {
      const nuevaPaginaActual = paginaactual - 1;
      if(nuevaPaginaActual === 0 ) return;
      guardarPaginaActual(nuevaPaginaActual);
    }

    // Definir la pagina siguiente
    const PaginaSiguiente = () => {
      const nuevaPaginaActual = paginaactual + 1;
      if(nuevaPaginaActual > totalpaginas ) return;
      guardarPaginaActual(nuevaPaginaActual);
    }




  return (
      <div className="container">
        <div className="jumbotron">
          <p className="lead text-center">
            Buscador de Imagenes
          </p>
          <Formulario
            guardarBusqueda={guardarBusqueda}
          />
        </div>
        <div className="row justify-content-center">
                <ListarImagenes
               imagenes={imagenes}
                />

                { (paginaactual === 1) ? null : (

                      <button
                        type="button"
                        className="btn btn-info mr-1"
                        onClick={PaginaAnterior}
                          >
                          &laquo; Anterior
                        </button>
                )}

                { (paginaactual === totalpaginas ) ? null : (
                  <button
                  type="button"
                  className="btn btn-info mr-1"
                  onClick={PaginaSiguiente}

                  >
                  Siguiente &raquo;
                  </button>
                )

                }
        </div>
      </div>
  );
}

export default App;

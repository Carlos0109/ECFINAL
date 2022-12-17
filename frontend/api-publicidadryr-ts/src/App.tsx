import React from 'react';
import './App.css';
import ComponenteMenu from './menu/ComponenteMenu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import rutas from './route-config';

function App() {
  return (
    <div className='container'>
    {/* son las rutas del menu pricipal */}
    <BrowserRouter>
    {/* este es el menu pricipal */}
    <ComponenteMenu/>
    <Routes>
      {/* <Route path="/" element={<ComponentePrincipal/>} />
      <Route path="/autores" element={<ComponenteListaAutor/>} />
      <Route path="/libros" element={<ComponenteListaLibro />} /> */}
      {
      rutas.map(ruta => 
      <Route key={ruta.path} path={ruta.path} element={<ruta.componente/>}/>)
      }
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

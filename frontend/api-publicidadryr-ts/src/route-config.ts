//Listado tablas
import ComponenteListaCategoria from "./categoria/ComponenteListaCategoria";
import ComponenteListaCliente from "./clientes/ComponenteListaCliente";
import ComponenteListaProducto from "./productos/ComponenteListaProducto";
import ComponenteListaUsuario from "./usuarios/ComponenteListaUsuario";
import ComponenteListaVenta from "./ventas/ComponenteListaVenta";
import ComponenteListaDVenta from "./dventas/ComponenteListaDVenta";
//Registro
import ComponenteRegistrarCategoria from "./categoria/ComponenteRegistrarCategoria";
import ComponenteRegistrarCliente from "./clientes/ComponenteRegistrarCliente";
import ComponenteRegistrarProducto from "./productos/ComponenteRegistrarProducto";
import ComponenteRegistrarUsuario from "./usuarios/ComponenteRegistrarUsuario";
import ComponenteRegistrarVenta from "./ventas/ComponenteRegistrarVenta";
import ComponenteRegistrarDVenta from "./dventas/ComponenteRegistrarDVenta";
// //Actualizacion
import ComponenteActualizarCategoria from "./categoria/ComponenteActualizarCategoria";
import ComponenteActualizarCliente from "./clientes/ComponenteActualizarCliente";
import ComponenteActualizarProducto from "./productos/ComponenteActualizarProducto";
import ComponenteActualizarUsuario from "./usuarios/ComponenteActualizarUsuario";
import ComponenteActualizarVenta from "./ventas/ComponenteActualizarVenta";
import ComponenteActualizarDVenta from "./dventas/ComponenteActualizarDVenta";


import ComponentePrincipal from "./principal/ComponentePrincipal";
import ComponenteRedireccionar from "./principal/ComponenteRedireccionar";

const rutas = [
{path: '/',componente:ComponentePrincipal},
{path: '/categoria/registrar',componente:ComponenteRegistrarCategoria},
{path: '/categoria/actualizar/:id',componente:ComponenteActualizarCategoria},
{path: '/categoria',componente: ComponenteListaCategoria},
{path: '/clientes/registrar',componente:ComponenteRegistrarCliente},
{path: '/clientes/actualizar/:id',componente:ComponenteActualizarCliente},
{path: '/clientes',componente:ComponenteListaCliente},
{path: '/productos/registrar',componente:ComponenteRegistrarProducto},
{path: '/productos/actualizar/:id',componente:ComponenteActualizarProducto},
{path: '/productos',componente:ComponenteListaProducto},
{path: '/usuarios/registrar',componente:ComponenteRegistrarUsuario},
{path: '/usuarios/actualizar/:id',componente:ComponenteActualizarUsuario},
{path: '/usuarios',componente:ComponenteListaUsuario},
{path: '/ventas/registrar',componente:ComponenteRegistrarVenta},
{path: '/ventas/actualizar/:id',componente:ComponenteActualizarVenta},
{path: '/ventas',componente:ComponenteListaVenta},
{path: '/dventas/registrar',componente:ComponenteRegistrarDVenta},
{path: '/dventas/actualizar/:id', componente: ComponenteActualizarDVenta},
{path: '/dventas', componente: ComponenteListaDVenta},


// creando un path para rutas no encontradas esto siempre va al final
{path: '*',componente:ComponenteRedireccionar}
];

export default rutas;
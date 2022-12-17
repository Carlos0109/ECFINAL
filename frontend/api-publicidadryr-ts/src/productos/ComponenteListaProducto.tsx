import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductoDTO } from "./producto.model";

export default function ComponenteListaProducto(){
    const url = "https://localhost:44367/api-publicidadRyR/juguetes";
    const [Productos, setProductos] = useState<ProductoDTO[]>();

    const peticionesGet = async () => {
        await axios
            .get(url)
            .then((response) => {
                setProductos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        peticionesGet();
    }, []);

    return(
        <div>
            <h1>Lista de Productos</h1>
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Estado</th>
                            <th scope="col">CódigoCategoria</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* se muestra los datos de la tabla */}
                        {Productos?.map((producto) => (
                            <tr key={producto.id_prod}>
                                <th scope="row">{producto.id_prod}</th>
                                <td>{producto.precio_prod}</td>
                                <td>{producto.cant_prod}</td>
                                <td>{producto.nombreprod}</td>
                                {producto.estado ? <td>Habilitado</td> : <td>Deshabilitado</td>}
                                <td>{producto.cod_cat}</td>
                                <td>
                                    <Link
                                        to={`/productos/actualizar/${producto.id_prod}`}
                                        className="btn btn-success"
                                    >
                                        Actualizar
                                    </Link>
                                </td>
                                <td>
                                    <a href="#" className="btn btn-danger">
                                        Eliminar
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <a href="productos/registrar" className="btn btn-primary">
                Registrar Producto
            </a>
        </div>
    );
}
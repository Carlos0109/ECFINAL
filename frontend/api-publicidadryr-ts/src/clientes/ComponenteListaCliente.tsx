import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClienteDTO } from "./cliente.model";

export default function ComponenteListaCliente() {
    //definimos la direccion del END POINT
    const url = "https://localhost:44367/api-publicidadRyR/cliente";
    const [clientes, setClientes] = useState<ClienteDTO[]>();

    const peticionesGet = async () => {
        await axios
            .get(url)
            .then((response) => {
                setClientes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        peticionesGet();
    }, []);

    return (
        <div>
            <h1>Lista de Clientes</h1>
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Estado</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* se muestra los datos de la tabla */}
                        {clientes?.map((cliente) => (
                            <tr key={cliente.codigocliente}>
                                <th scope="row">{cliente.codigocliente}</th>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.apellido}</td>
                                <td>{cliente.telefono}</td>
                                {cliente.estado ? <td>Habilitado</td> : <td>Deshabilitado</td>}
                                <td>
                                    <Link
                                        to={`/clientes/actualizar/${cliente.codigocliente}`}
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

            <a href="clientes/registrar" className="btn btn-primary">
                Registrar Cliente
            </a>
        </div>
    );
}
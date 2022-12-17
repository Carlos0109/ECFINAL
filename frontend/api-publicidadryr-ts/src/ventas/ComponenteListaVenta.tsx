import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VentaDTO } from "./ventas.model";

export default function ComponenteListaVenta(){
    const url = "https://localhost:44367/api-publicidadRyR/venta";
    const [Venta, setVenta] = useState<VentaDTO[]>();

    const peticionesGet = async () => {
        await axios
            .get(url)
            .then((response) => {
                setVenta(response.data);
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
            <h1>Lista de Venta</h1>
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">NombreCliente</th>
                            <th scope="col">Total</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Cod_User</th>
                            <th scope="col">Cod_Cli</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* se muestra los datos de la tabla */}
                        {Venta?.map((ven) => (
                            <tr key={ven.codigo_venta}>
                                <th scope="row">{ven.codigo_venta}</th>
                                <td>{ven.fech_venta}</td>
                                <td>{ven.nom_cli}</td>
                                <td>{ven.total}</td>
                                {ven.estado ? <td>Habilitado</td> : <td>Deshabilitado</td>}
                                <td>{ven.codigo_user}</td>
                                <td>{ven.codigocliente}</td>
                                <td>
                                    <Link
                                        to={`/ventas/actualizar/${ven.codigo_venta}`}
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

            <a href="ventas/registrar" className="btn btn-primary">
                Registrar Venta
            </a>
        </div>
    );
}
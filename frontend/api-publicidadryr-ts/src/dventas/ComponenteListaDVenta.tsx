import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DVentaDTO } from "./dventa.model";

export default function ComponenteListaDVenta(){
    const url = "https://localhost:44367/api-publicidadRyR/dventa";
    const [dven, setDven] = useState<DVentaDTO[]>();

    const peticionesGet = async () => {
        await axios
            .get(url)
            .then((response) => {
                setDven(response.data);
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
            <h1>Lista de Detalle de Venta</h1>
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">NombreProducto</th>
                            <th scope="col">Importe</th>
                            <th scope="col">CodPro</th>
                            <th scope="col">CodVen</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* se muestra los datos de la tabla */}
                        {dven?.map((dven) => (
                            <tr key={dven.id_detalle_venta}>
                                <th scope="row">{dven.id_detalle_venta}</th>
                                <td>{dven.cantidad}</td>
                                <td>{dven.producto}</td>
                                <td>{dven.importe}</td>
                                <td>{dven.id_prod}</td>
                                <td>{dven.codigo_venta}</td>
                                <td>
                                    <Link
                                        to={`/dventas/actualizar/${dven.id_detalle_venta}`}
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

            <a href="dventas/registrar" className="btn btn-primary">
                Registrar Detalle de Venta
            </a>
        </div>
    );
}
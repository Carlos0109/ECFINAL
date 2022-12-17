import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoriaDTO } from "./categoria.model";

export default function ComponenteListaCategoria() {
    const url = "https://localhost:44367/api-publicidadRyR/categoria";
    const [categoria, setCategoria] = useState<CategoriaDTO[]>();

    const peticionesGet = async () => {
        await axios
            .get(url)
            .then((response) => {
                setCategoria(response.data);
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
            <h1>Lista de Categoria</h1>
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Estado</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* se muestra los datos de la tabla */}
                        {categoria?.map((categoria) => (
                            <tr key={categoria.cod_cat}>
                                <th scope="row">{categoria.cod_cat}</th>
                                <td>{categoria.nom_cat}</td>
                                {categoria.estado ? <td>Habilitado</td> : <td>Deshabilitado</td>}
                                <td>
                                    <Link
                                        to={`/categoria/actualizar/${categoria.cod_cat}`}
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

            <a href="categoria/registrar" className="btn btn-primary">
                Registrar Categoria
            </a>
        </div>
    );
}
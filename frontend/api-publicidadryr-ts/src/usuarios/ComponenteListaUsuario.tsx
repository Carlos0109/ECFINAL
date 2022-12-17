import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UsuarioDTO } from "./usuario.model";

export default function ComponenteListaUsuario(){
    const url = "https://localhost:44367/api-publicidadRyR/usuario";
    const [Usuarios, setUsuarios] = useState<UsuarioDTO[]>();

    const peticionesGet = async () => {
        await axios
            .get(url)
            .then((response) => {
                setUsuarios(response.data);
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
            <h1>Lista de Usuarios</h1>
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Cargo</th>
                            <th scope="col">Username</th>
                            <th scope="col">Contraseña</th>
                            <th scope="col">Estado</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* se muestra los datos de la tabla */}
                        {Usuarios?.map((user) => (
                            <tr key={user.codigo_user}>
                                <th scope="row">{user.codigo_user}</th>
                                <td>{user.nombre_user}</td>
                                <td>{user.ape_user}</td>
                                <td>{user.cargo}</td>
                                <td>{user.username}</td>
                                <td>{user.pass}</td>
                                {user.estado ? <td>Habilitado</td> : <td>Deshabilitado</td>} 
                                <td>
                                    <Link
                                        to={`/usuarios/actualizar/${user.codigo_user}`}
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

            <a href="usuarios/registrar" className="btn btn-primary">
                Registrar Usuario
            </a>
        </div>
    );
}
import axios from "axios";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import ComponenteFormularioCajaTexto from "../utilidad/ComponenteFormularioCajaTexto";
import { UsuarioRegistrarDTO } from "./usuario.model";

export default function ComponenteRegistrarUsuario() {
    const history = useNavigate();
    const url = "https://localhost:44367/api-publicidadRyR/usuario";

    async function RegistrarUsuario(user: UsuarioRegistrarDTO) {
        try {
            await axios.post(url, user);
            history("/usuarios");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Registro de Usuarios</h1>
            <Formik
                initialValues={{
                    nombre_user: "",
                    ape_user: "",
                    cargo: "",
                    username:"",
                    pass: "",
                    estado: true,
                }}
                onSubmit={async valores => {

                    await new Promise(r => setTimeout(r, 3000));
                    // var est = false;
                    // if (valores.estado == 'true') {
                    //     est = true;
                    // } else {
                    //     est = false;
                    // }
                    // await RegistrarUsuario({
                    //     nombre_user: valores.nombre_user,
                    //     ape_user: valores.ape_user,
                    //     cargo: valores.cargo,
                    //     username: valores.username,
                    //     pass: valores.pass,
                    //     estado: est,
                    // });
                    await RegistrarUsuario(valores);
                }
                }

                validationSchema={Yup.object({
                    nombre_user: Yup.string().required("Este campo es requerido").max(40, "La longitud máxima del nombre es 40 caracteres"),
                    ape_user: Yup.string().required("Este campo es requerido").max(40, "La longitud máxima del apellido es 40 caracteres"),
                })}>

            <Form className="form-control">
                <ComponenteFormularioCajaTexto
                    campo="nombre_user" label="Nombre" />
                    <ComponenteFormularioCajaTexto
                    campo="ape_user" label="Apellido" />
                    <ComponenteFormularioCajaTexto
                    campo="cargo" label="Cargo" />
                    <ComponenteFormularioCajaTexto
                    campo="username" label="Username" />
                    <ComponenteFormularioCajaTexto
                    campo="pass" label="Contraseña" />
                <div className="row">
                    <div className="col-6">
                        <label className="form-label">Estado:</label>
                        <div className="col-6 form-check">
                            <input type="checkbox"
                                className="form-check-input"
                                id="estado"
                                name="estado"
                            />
                            <label
                                className="form-check-label">Habilitado</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 mt-2">
                        <button type="submit" className="btn btn-primary">
                            Registrar
                        </button>
                        <Link className="btn btn-secondary" to="/usuarios">
                            Cancelar
                        </Link>
                    </div>
                </div>
            </Form>
        </Formik>
    </div >
  );
}
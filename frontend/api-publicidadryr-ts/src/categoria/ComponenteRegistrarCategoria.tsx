import axios from "axios";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import ComponenteFormularioCajaTexto from "../utilidad/ComponenteFormularioCajaTexto";
import { CategoriaRegistrarDTO } from "./categoria.model";

export default function ComponenteRegistrarCategoria() {
    const history = useNavigate();
    const url = "https://localhost:44367/api-publicidadRyR/categoria";

    async function RegistrarCategoria(cliente: CategoriaRegistrarDTO) {
        try {
            await axios.post(url, cliente);
            history("/categoria");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Registro de Categoria</h1>
            <Formik
                initialValues={{
                    nom_cat: "",
                    estado: true
                }}
                onSubmit={async valores => {

                    await new Promise(r => setTimeout(r, 3000));
                    // var est = false;
                    // if (valores.estado == 'true') {
                    //     est = true;
                    // } else {
                    //     est = false;
                    // }
                    // await RegistrarCategoria({
                    //     nom_cat: valores.nom_cat,
                    //     estado: est,
                    // });
                    await RegistrarCategoria(valores);
                }
                }

                validationSchema={Yup.object({
                    nom_cat: Yup.string().required("Este campo es requerido").max(100, "La longitud máxima del nombre es 50 caracteres"),
                })}>

            <Form className="form-control">
                <ComponenteFormularioCajaTexto
                    campo="nom_cat" label="Nombre" />
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
                        <Link className="btn btn-secondary" to="/categoria">
                            Cancelar
                        </Link>
                    </div>
                </div>
            </Form>
        </Formik>
    </div >
  );
}         

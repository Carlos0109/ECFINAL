import axios from "axios";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import ComponenteFormularioCajaTexto from "../utilidad/ComponenteFormularioCajaTexto";
import { ProductoRegistrarDTO } from "./producto.model";

export default function ComponenteRegistrarProducto() {
    const history = useNavigate();
    const url = "https://localhost:44367/api-publicidadRyR/juguetes";

    async function RegistrarProducto(prod: ProductoRegistrarDTO) {
        try {
            await axios.post(url, prod);
            history("/productos");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Registro de Productos</h1>
            <Formik
                initialValues={{
                    precio_prod: "",
                    cant_prod: "",
                    nombreprod: "",
                    estado: true,
                    cod_cat: "",
                }}
                onSubmit={async valores => {

                    await new Promise(r => setTimeout(r, 3000));
                    // var est = false;
                    // if (valores.estado == 'true') {
                    //     est = true;
                    // } else {
                    //     est = false;
                    // }
                    // await RegistrarProducto({
                    //     precio_prod: valores.precio_prod,
                    //     cant_prod: valores.cant_prod,
                    //     nombreprod: valores.nombreprod,
                    //     estado: est,
                    //     cod_cat: valores.cod_cat,
                    // });
                    await RegistrarProducto(valores);
                }
                }

                validationSchema={Yup.object({
                    nombreprod: Yup.string().required("Este campo es requerido").max(40, "La longitud máxima del nombre es 40 caracteres"),
                })}>

            <Form className="form-control">
                <ComponenteFormularioCajaTexto
                campo="precio_prod" label="Precio" />
                <ComponenteFormularioCajaTexto
                campo="cant_prod" label="Cantidad" />
                <ComponenteFormularioCajaTexto
                campo="nombreprod" label="Nombre" />
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
                <ComponenteFormularioCajaTexto
                    campo="cod_cat" label="CodigoCategoria" />
                <div className="row">
                    <div className="col-6 mt-2">
                        <button type="submit" className="btn btn-primary">
                            Registrar
                        </button>
                        <Link className="btn btn-secondary" to="/productos">
                            Cancelar
                        </Link>
                    </div>
                </div>
            </Form>
        </Formik>
    </div >
  );
}         


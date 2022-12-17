import axios from "axios";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import ComponenteFormularioCajaTexto from "../utilidad/ComponenteFormularioCajaTexto";
import { VentaRegistrarDTO } from "./ventas.model";

export default function ComponenteRegistrarVenta() {
    const history = useNavigate();
    const url = "https://localhost:44367/api-publicidadRyR/venta";

    async function RegistrarVenta(ven: VentaRegistrarDTO) {
        try {
            await axios.post(url, ven);
            history("/ventas");
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div>
            <h1>Registro de Ventas</h1>
            <Formik
                initialValues={{
                    fech_venta: "",
                    nom_cli: "",
                    total: "",
                    estado: true,
                    codigo_user: "",
                    codigocliente: "",
                }}
                onSubmit={async valores => {

                    await new Promise(r => setTimeout(r, 3000));
                    // var est = false;
                    // if (valores.estado == 'true') {
                    //     est = true;
                    // } else {
                    //     est = false;
                    // }
                    // await RegistrarVenta({
                    //     fech_venta: valores.fech_venta,
                    //     nom_cli: valores.nom_cli,
                    //     total: valores.total,
                    //     estado: est,
                    //     codigo_user: valores.codigo_user,
                    //     codigocliente: valores.codigocliente,
                    // });
                    await RegistrarVenta(valores);
                }
                }

                validationSchema={Yup.object({
                    nom_cli: Yup.string().required("Este campo es requerido").max(50, "La longitud máxima del nombre es 50 caracteres"),
                })}>

            <Form className="form-control">
                <ComponenteFormularioCajaTexto
                campo="fech_venta" label="Fecha" />
                <ComponenteFormularioCajaTexto
                campo="nom_cli" label="Nombre" />
                <ComponenteFormularioCajaTexto
                campo="total" label="Total" />
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
                    campo="codigo_user" label="CodigoUser" />
                <ComponenteFormularioCajaTexto
                    campo="codigocliente" label="CodigoCli" />  
                <div className="row">
                    <div className="col-6 mt-2">
                        <button type="submit" className="btn btn-primary">
                            Registrar
                        </button>
                        <Link className="btn btn-secondary" to="/ventas">
                            Cancelar
                        </Link>
                    </div>
                </div>
            </Form>
        </Formik>
    </div >
    );
}
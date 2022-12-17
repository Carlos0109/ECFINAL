import axios from "axios";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import ComponenteFormularioCajaTexto from "../utilidad/ComponenteFormularioCajaTexto";
import { DVentaRegistrarDTO } from "./dventa.model";

export default function ComponenteRegistrarDVenta() {
    const history = useNavigate();
    const url = "https://localhost:44367/api-publicidadRyR/dventa";

    async function RegistrarDVenta(dven: DVentaRegistrarDTO) {
        try {
            await axios.post(url, dven);
            history("/dventas");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Registro del Detalle</h1>
            <Formik
                initialValues={{
                    cantidad: "",
                    producto: "",
                    importe: "",
                    id_prod: "",
                    codigo_venta: "",
                }}
                onSubmit={async valores => {

                    await new Promise(r => setTimeout(r, 3000));
                    
                    await RegistrarDVenta({
                        cantidad: valores.cantidad,
                        producto: valores.producto,
                        importe: valores.importe,
                        id_prod: valores.id_prod,
                        codigo_venta: valores.codigo_venta,
                    });
                }
                }

                validationSchema={Yup.object({
                    producto: Yup.string().required("Este campo es requerido").max(40, "La longitud máxima del nombre es 40 caracteres"),
                })}>

            <Form className="form-control">
                <ComponenteFormularioCajaTexto
                campo="cantidad" label="Cantidad" />
                <ComponenteFormularioCajaTexto
                campo="producto" label="Producto" />
                <ComponenteFormularioCajaTexto
                campo="importe" label="Importe" />
                <ComponenteFormularioCajaTexto
                campo="id_prod" label="CodProd" />
                <ComponenteFormularioCajaTexto
                campo="codigo_venta" label="CodVenta" />
                <div className="row">
                    <div className="col-6 mt-2">
                        <button type="submit" className="btn btn-primary">
                            Registrar
                        </button>
                        <Link className="btn btn-secondary" to="/dventas">
                            Cancelar
                        </Link>
                    </div>
                </div>
            </Form>
        </Formik>
    </div >
  );
}
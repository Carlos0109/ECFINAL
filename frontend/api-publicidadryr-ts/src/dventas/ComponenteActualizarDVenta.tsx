import axios from "axios";
import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { DVentaDTO } from "./dventa.model";
export default function ComponenteActualizarDVenta() {
  // creamos una variable para capturar el codigo que se va actualizar
  const { id }: any = useParams();
  const history = useNavigate();
  const url = "https://localhost:44367/api-publicidadRyR/dventa/";

  const [dven, setDven] = useState<DVentaDTO>();
  //se realiza la peticion al API por medio del axios
  const peticionesGet = async () => {
    await axios
      .get(url + id)
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

  async function ActualizarDventa(dven: DVentaDTO) {
    try {
      await axios.put(url + id, dven);
      history("/dventas");
    } catch (error) {
      console.log(error);
    }
  }

  type State={
    text: string;
  };

  // const onChange=(e:React.FormEvent<HTMLInputElement>):
  // void=>{
  //   this.setState({text:e.currentTarget.
  //     value});
  // }
  return (
    <div>
      <h1>Actualizar Detalle</h1>
      <Formik
        initialValues={{
            id_detalle_venta: 0,
            cantidad: 0,
            producto: "",
            importe: 0,
            id_prod: 0,
            codigo_venta: 0,
        }}
        onSubmit={async (valores) => {
          await ActualizarDventa({
            id_detalle_venta:valores.id_detalle_venta,
            cantidad: valores.cantidad,
            producto: valores.producto,
            importe: valores.importe,
            id_prod: valores.id_prod,
            codigo_venta: valores.codigo_venta,
          });
        }}
        validationSchema={Yup.object({
            producto: Yup.string().required("Este campo es requerido").max(40, "La longitud máxima del nombre es 40 caracteres"),
        })}
      >
        <Form>
          <div className="row">
            <div className="col-6">
              <label className="form-label">Codigo:</label>
              <Field
                name="codigo"
                type="number"
                value={dven?.id_detalle_venta}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Cantidad:</label>
              <Field
                name="cantidad"
                type="number"
                value={dven?.cantidad}
                className="form-control"
                
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">NompreProd:</label>
              <Field
                name="producto"
                type="text"
                value={dven?.producto}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Importe:</label>
              <Field
                name="importe"
                type="number"
                value={dven?.importe}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">CodProd:</label>
              <Field
                name="id_prod"
                type="number"
                value={dven?.id_prod}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">CodVenta:</label>
              <Field
                name="codigo_venta"
                type="number"
                value={dven?.codigo_venta}
                className="form-control"
              />
            </div>
          </div>

          
          <div className="row">
            <div className="col-6">
              <button type="submit" className="btn btn-success">
                Actualizar
              </button>
              <Link className="btn btn-secondary" to="/dventas">
                Cancelar
              </Link>
            </div>
          </div>
        </Form>
      </Formik>

      <hr />
    </div>
  );
}
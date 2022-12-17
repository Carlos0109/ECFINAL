import axios from "axios";
import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { VentaDTO } from "./ventas.model";
export default function ComponenteActualizarVenta() {
  // creamos una variable para capturar el codigo que se va actualizar
  const { id }: any = useParams();
  const history = useNavigate();
  const url = "https://localhost:44367/api-publicidadRyR/venta/";

  const [ven, setVen] = useState<VentaDTO>();
  //se realiza la peticion al API por medio del axios
  const peticionesGet = async () => {
    await axios
      .get(url + id)
      .then((response) => {
        setVen(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionesGet();
  }, []);

  async function ActualizarVenta(ven: VentaDTO) {
    try {
      await axios.put(url + id, ven);
      history("/ventas");
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
      <h1>Actualizar Venta</h1>
      <Formik
        initialValues={{
            codigo_venta: 0,
            fech_venta: "",
            nom_cli: "",
            total: 0,
            estado: false,
            codigo_user: 0,
            codigocliente: 0,
        }}
        onSubmit={async (valores) => {
          await ActualizarVenta({
            codigo_venta: valores.codigo_venta,
            fech_venta: valores.fech_venta,
            nom_cli: valores.nom_cli,
            total: valores.total,
            estado: valores.estado,
            codigo_user: valores.codigo_user,
            codigocliente: valores.codigocliente,
          });
        }}
        validationSchema={Yup.object({
            nom_cli: Yup.string().required("Este campo es requerido").max(50, "La longitud máxima del nombre es 50 caracteres"),
        })}
      >
        <Form>
          <div className="row">
            <div className="col-6">
              <label className="form-label">Codigo:</label>
              <Field
                name="codigoautor"
                type="number"
                value={ven?.codigo_venta}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Fecha:</label>
              <Field
                name="nombre"
                type="text"
                value={ven?.fech_venta}
                className="form-control"
                
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">NomCliente:</label>
              <Field
                name="nombre"
                type="text"
                value={ven?.nom_cli}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Total:</label>
              <Field
                name="nombre"
                type="number"
                value={ven?.total}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Estado:</label>
              <div className="col-6 form-check">
                {ven?.estado ? (
                  <div>
                    <Field
                      className="form-check-input"
                      name="estado"
                      type="checkbox"
                      checked="true"
                    />
                    <label className="form-check-label">Habilitado</label>
                  </div>
                ) : (
                  <div>
                    <Field
                      className="form-check-input"
                      name="estado"
                      type="checkbox"
                    />
                    <label className="form-check-label">Deshabilitado</label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">CodigoUser:</label>
              <Field
                name="nombre"
                type="number"
                value={ven?.codigo_user}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">CodigoCli:</label>
              <Field
                name="nombre"
                type="number"
                value={ven?.codigocliente}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <button type="submit" className="btn btn-success">
                Actualizar
              </button>
              <Link className="btn btn-secondary" to="/ventas">
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
import axios from "axios";
import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import ComponenteFormularioCajaTexto from "../utilidad/ComponenteFormularioCajaTexto";
import { ClienteDTO } from "./cliente.model";
export default function ComponenteActualizarCliente() {
  // creamos una variable para capturar el codigo que se va actualizar
  const { id }: any = useParams();
  const history = useNavigate();
  const url = "https://localhost:44367/api-publicidadRyR/cliente/";

  const [clientes, setClientes] = useState<ClienteDTO>();
  //se realiza la peticion al API por medio del axios
  const peticionesGet = async () => {
    await axios
      .get(url + id)
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionesGet();
  }, []);

  async function ActualizarCliente(cliente: ClienteDTO) {
    try {
      await axios.put(url + id, cliente);
      history("/clientes");
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
      <h1>Actualizar Cliente</h1>
      <Formik
        initialValues={{
          codigocliente: 0,
          nombre: "",
          apellido: "",
          telefono: "",
          estado: false,
        }}
        onSubmit={async (valores) => {
          await ActualizarCliente({
            codigocliente: valores.codigocliente,
            nombre: valores.nombre,
            apellido: valores.apellido,
            telefono: valores.telefono,
            estado: valores.estado,
          });
        }}
        validationSchema={Yup.object({
          nombre:Yup.string().required("Este campo es requerido").max(100, "La longitud máxima del nombre es 50 caracteres"),
          apellido:Yup.string().required("Este campo es requerido").max(100, "La longitud máxima del apellido es 50 caracteres"),
          telefono:Yup.number().required("Este campo es requerido"),
        })}
      >
        <Form>
          <div className="row">
            <div className="col-6">
              <label className="form-label">Codigo:</label>
              <Field
                name="codigoautor"
                type="text"
                value={clientes?.codigocliente}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Nombre:</label>
              <Field
                name="nombre"
                type="text"
                value={clientes?.nombre}
                className="form-control"
                
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Apellido:</label>
              <Field
                name="nombre"
                type="text"
                value={clientes?.apellido}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Teléfono:</label>
              <Field
                name="nombre"
                type="text"
                value={clientes?.telefono}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Estado:</label>
              <div className="col-6 form-check">
                {clientes?.estado ? (
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
              <button type="submit" className="btn btn-success">
                Actualizar
              </button>
              <Link className="btn btn-secondary" to="/clientes">
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
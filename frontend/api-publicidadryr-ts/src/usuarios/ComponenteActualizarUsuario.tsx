import axios from "axios";
import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { UsuarioDTO } from "./usuario.model";
export default function ComponenteActualizarUsuario() {
    // creamos una variable para capturar el codigo que se va actualizar
  const { id }: any = useParams();
  const history = useNavigate();
  const url = "https://localhost:44367/api-publicidadRyR/usuario/";

  const [user, setUser] = useState<UsuarioDTO>();
  //se realiza la peticion al API por medio del axios
  const peticionesGet = async () => {
    await axios
      .get(url + id)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionesGet();
  }, []);

  async function ActualizarUsuario(user: UsuarioDTO) {
    try {
      await axios.put(url + id, user);
      history("/usuarios");
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
      <h1>Actualizar Usuario</h1>
      <Formik
        initialValues={{
            codigo_user: 0,
            nombre_user: "",
            ape_user: "",
            cargo: "",
            username: "",
            pass: "",
            estado: false,
        }}
        onSubmit={async (valores) => {
          await ActualizarUsuario({
            codigo_user: valores.codigo_user,
            nombre_user: valores.nombre_user,
            ape_user: valores.ape_user,
            cargo: valores.cargo,
            username: valores.username,
            pass: valores.pass,
            estado: valores.estado,
          });
        }}
        validationSchema={Yup.object({
            nombre_user: Yup.string().required("Este campo es requerido").max(40, "La longitud máxima del nombre es 40 caracteres"),
            ape_user: Yup.string().required("Este campo es requerido").max(40, "La longitud máxima del apellido es 40 caracteres"),
        })}
      >
        <Form>
          <div className="row">
            <div className="col-6">
              <label className="form-label">Codigo:</label>
              <Field
                name="codigoautor"
                type="text"
                value={user?.codigo_user}
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
                value={user?.nombre_user}
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
                value={user?.ape_user}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Cargo:</label>
              <Field
                name="nombre"
                type="text"
                value={user?.cargo}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Username:</label>
              <Field
                name="nombre"
                type="text"
                value={user?.username}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Pass:</label>
              <Field
                name="nombre"
                type="text"
                value={user?.pass}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Estado:</label>
              <div className="col-6 form-check">
                {user?.estado ? (
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
              <Link className="btn btn-secondary" to="/usuarios">
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
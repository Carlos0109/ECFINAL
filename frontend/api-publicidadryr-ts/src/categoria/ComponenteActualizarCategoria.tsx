import axios from "axios";
import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { CategoriaDTO } from "./categoria.model";
export default function ComponenteActualizarCategoria() {
  const { id }: any = useParams();
  const history = useNavigate();
  const url = "https://localhost:44367/api-publicidadRyR/categoria/";
  const [categoria, setCategoria] = useState<CategoriaDTO>();

  const peticionesGet = async () => {
    await axios
      .get(url + id)
      .then((response) => {
        setCategoria(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionesGet();
  }, []);

  async function ActualizarCategoria(categoria: CategoriaDTO) {
    try {
      await axios.put(url + id, categoria);
      history("/categoria");
    } catch (error) {
      console.log(error);
    }
  }

  type State={
    text: string;
  };
  return (
    <div>
      <h1>Actualizar Categoria</h1>
      <Formik
        initialValues={{
          cod_cat: 0,
          nom_cat: "",
          estado: false,
        }}
        onSubmit={async (valores) => {
          await ActualizarCategoria({
            cod_cat: valores.cod_cat,
            nom_cat: valores.nom_cat,
            estado: valores.estado,
          });
        }}
        validationSchema={Yup.object({
          nom_cat:Yup.string().required("Este campo es requerido").max(40, "La longitud máxima del nombre es 40 caracteres"),
        })}
      >
        <Form>
          <div className="row">
            <div className="col-6">
              <label className="form-label">Codigo:</label>
              <Field
                name="cod_cat"
                type="text"
                value={categoria?.cod_cat}
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
                value={categoria?.nom_cat}
                className="form-control"
                
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Estado:</label>
              <div className="col-6 form-check">
                {categoria?.estado ? (
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
              <Link className="btn btn-secondary" to="/categoria">
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
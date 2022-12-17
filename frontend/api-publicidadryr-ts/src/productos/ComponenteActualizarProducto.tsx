import axios from "axios";
import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { ProductoDTO } from "./producto.model";
export default function ComponenteActualizarProducto() {
    // creamos una variable para capturar el codigo que se va actualizar
  const { id }: any = useParams();
  const history = useNavigate();
  const url = "https://localhost:44367/api-publicidadRyR/juguetes/";

  const [producto, setProducto] = useState<ProductoDTO>();

  //se realiza la peticion al API por medio del axios
  const peticionesGet = async () => {
    await axios
      .get(url + id)
      .then((response) => {
        setProducto(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionesGet();
  }, []);

  async function ActualizarProducto(producto: ProductoDTO) {
    try {
      await axios.put(url + id, producto);
      history("/productos");
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
      <h1>Actualizar Producto</h1>
      <Formik
        initialValues={{
            id_prod: 0,
            precio_prod: 0,
            cant_prod: 0,
            nombreprod: "",
            estado: false,
            cod_cat: 0,
        }}
        onSubmit={async (valores) => {
          await ActualizarProducto({
            id_prod: valores.id_prod,
            precio_prod: valores.precio_prod,
            cant_prod: valores.cant_prod,
            nombreprod: valores.nombreprod,
            estado: valores.estado,
            cod_cat: valores.cod_cat,
          });
        }}
        validationSchema={Yup.object({
            nombreprod: Yup.string().required("Este campo es requerido").max(40, "La longitud máxima del nombre es 40 caracteres"),
        })}
      >
        <Form>
          <div className="row">
            <div className="col-6">
              <label className="form-label">Codigo:</label>
              <Field
                name="codigoautor"
                type="number"
                value={producto?.id_prod}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Precio:</label>
              <Field
                name="pre"
                type="number"
                value={producto?.precio_prod}
                className="form-control"
                
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Cantidad:</label>
              <Field
                name="can"
                type="number"
                value={producto?.cant_prod}
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
                value={producto?.nombreprod}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label className="form-label">Estado:</label>
              <div className="col-6 form-check">
                {producto?.estado ? (
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
              <label className="form-label">Codigo-Categoria:</label>
              <Field
                name="cod_cat"
                type="number"
                value={producto?.cod_cat}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <button type="submit" className="btn btn-success">
                Actualizar
              </button>
              <Link className="btn btn-secondary" to="/productos">
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
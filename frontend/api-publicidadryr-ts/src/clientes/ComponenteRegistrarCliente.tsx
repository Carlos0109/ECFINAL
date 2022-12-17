import axios from "axios";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import ComponenteFormularioCajaTexto from "../utilidad/ComponenteFormularioCajaTexto";
import {  ClienteRegistrarDTO } from "./cliente.model";

export default function ComponenteRegistrarCliente() {
  const history = useNavigate();
  const url = "https://localhost:44367/api-publicidadRyR/cliente";

  async function RegistrarCliente(cliente:ClienteRegistrarDTO) {
    try{
      await axios.post(url,cliente);
      history("/clientes");
    }catch(error){
      console.log(error)
    }
  }
  
  return (
    <div>
      <h1>Registro de Clientes</h1>
      <Formik
        initialValues={{
          nombre: "",
          apellido: "",
          telefono: "",
          estado: true,
        }}
        onSubmit={async valores=>{
            
          await new Promise(r=>setTimeout(r,3000));
          // var est=false;
          // if(valores.estado=='true'){
          //   est = true;
          // } else{
          //   est = false;
          // }
          // await RegistrarCliente({
          //   nombre:valores.nombre,
          //   apellido:valores.apellido,
          //   telefono:valores.telefono,
          //   estado: est,
          // });
          await RegistrarCliente(valores);
          // console.log(valores);
        }
      }

         validationSchema={Yup.object({
             nombre:Yup.string().required("Este campo es requerido").max(100, "La longitud máxima del nombre es 100 caracteres"),
             apellido:Yup.string().required("Este campo es requerido").max(100, "La longitud máxima del apellido es 100 caracteres"),
             telefono:Yup.number().required("Este campo es requerido"),
           })}
      >
        
        <Form className="form-control">
          <ComponenteFormularioCajaTexto 
          campo="nombre" label="Nombre" />
          <ComponenteFormularioCajaTexto 
          campo="apellido" label="Apellido"/>
          <ComponenteFormularioCajaTexto 
          campo="telefono" label="Telefono"/>
          <div className="row">
            <div className="col-6">
              <label className="form-label">Estado:</label>
              <div className="col-6 form-check">
                <Field
                  className="form-check-input"
                  type="checkbox"
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
              <Link className="btn btn-secondary" to="/clientes">
                Cancelar
              </Link>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}         




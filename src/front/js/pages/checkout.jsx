import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const Checkout = () => {
  const { store, actions } = useContext(Context);
  // definimos los estados
  const [adress, setAdress] = useState("");
  const [nombre, setNombre] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [datos, setDatos] = useState("");
  const [cellphone, setCellphone] = useState("");

  let navigate = useNavigate();

  const doSubmit = (e) => {
    e.preventDefault();
    let delibery = actions.signup(nombre, email, password);

    delibery ? navigate("/") : null;
  };

  return (
    <div className="container mt-5">
      <h2>¿Donde quieres recibir tu compra?</h2>
      <form onSubmit={doSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleName" className="form-label opacity-50">
            Nombre y Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleName"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label opacity-50">
            Departamento
          </label>
          <div class="input-group mb-3">
            <select
              class="form-select"
              id="inputGroupSelect01"
              aria-describedby="emailHelp"
              onChange={(e) => setDepartamento(e.target.value)}
              value={departamento}
            >
              <option selected>Departamento</option>
              <option value="1">Artigas</option>
              <option value="2">Canelones</option>
              <option value="3">Cerro Largo</option>
              <option value="4">Colonia</option>
              <option value="5">Durazno</option>
              <option value="6">Flores</option>
              <option value="7">Florida</option>
              <option value="8">Lavalleja</option>
              <option value="9">Maldonado</option>
              <option value="10">Melo</option>
              <option value="11">Paysandu</option>
              <option value="12">Rio Negro</option>
              <option value="13">Rivera</option>
              <option value="14">Rocha</option>
              <option value="15">Salto</option>
              <option value="16">San Jose</option>
              <option value="17">Soriano</option>
              <option value="18">Tacuarembo</option>
              <option value="19">Treinta y Tres</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label opacity-50"
          >
            Adress
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setAdress(e.target.value)}
            value={adress}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label opacity-50"
          >
            Datos adicionales
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setDatos(e.target.value)}
            value={datos}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label opacity-50"
          >
            Numbero de Telefono
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setCellphone(e.target.value)}
            value={cellphone}
          />
        </div>
        <Link to={""}>
          <button
            //   onClick={}
            type="button"
            className="btn btn-dark text-warning"
          >
            Continue
          </button>
        </Link>
      </form>
    </div>
  );
};

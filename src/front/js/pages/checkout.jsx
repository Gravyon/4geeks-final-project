import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PayPalCheckout } from "../component/checkout-paypal.jsx";
import Nav from "react-bootstrap/Nav";

export const Checkout = () => {
  const { store, actions } = useContext(Context);
  // definimos los estados:
  // const [address, setAddress] = useState("");
  // const [nombre, setNombre] = useState("");
  // const [departamento, setDepartamento] = useState("");
  // const [datos, setDatos] = useState("");
  // const [cellphone, setCellphone] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const doSubmit = (e) => {
    e.preventDefault();
    let delivery = actions.signup(
      nombre,
      address,
      departamento,
      datos,
      cellphone
    );

    delivery ? navigate("/") : null;
  };

  return (
    <>
      {store.auth ? (
        <div
          className="container d-flex justify-content-center vh-100"
          style={{ maxHeight: "50%", top: "0", zIndex: "-1000" }}
        >
          <div className="h-auto col mt-5">
            <h2>Medios de pago:</h2>
            <div className="col-sm-12 col-md-6 mx-auto">
              <form className="row g-2" onSubmit={doSubmit}>
                {/* <div className="col-md-6">
                  <label
                    htmlFor="exampleName"
                    className="form-label opacity-50"
                  >
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
                <div className="col-md-6">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label opacity-50"
                  >
                    Departamento
                  </label>
                  <div className="input-group mb-3">
                    <select
                      className="form-select"
                      id="inputGroupSelect01"
                      aria-describedby="emailHelp"
                      onChange={(e) => setDepartamento(e.target.value)}
                      value={departamento}
                    >
                      <option>Departamento</option>
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

                <div className="col-4">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label opacity-50"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </div>
                <div className="col-4">
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
                <div className="col-4">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label opacity-50"
                  >
                    Numero de Telefono
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => setCellphone(e.target.value)}
                    value={cellphone}
                  />
                </div> */}
                <br />
                {/* <h5>¿Como vas a pagar?</h5> */}
                <br />
                <hr />
                <div className="col-12">
                  <PayPalCheckout />
                </div>

                {/* <Link to={""}>
                  <button
                    //   onClick={}
                    type="button"
                    className="btn btn-dark"
                    style={{ color: "#bdb284" }}
                  >
                    Submit
                  </button>
                </Link> */}
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex vh-auto vh-100 text-center justify-content-center ">
          <div>
            <h1>Not logged in...</h1>
            <Nav.Link
              className="bg-dark"
              style={{ color: "#bdb284" }}
              href="/login"
            >
              Go to login
            </Nav.Link>
          </div>
        </div>
      )}
    </>
  );
};

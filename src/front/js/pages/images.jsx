import React, { useContext } from "react";
import { FormGroup, Label, Input, FormText, Form, Button } from "reactstrap";
import { useState } from "react";
import { Context } from "../store/appContext";
import Nav from "react-bootstrap/Nav";
import Swal from "sweetalert2";

export const SubirImagenes = () => {
  const { store, actions } = useContext(Context);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  let [url, setUrl] = useState("");
  // aaa
  const handleSubmit = async (e) => {
    e.preventDefault();
    let onUploaded = await actions.createProduct(
      name,
      description,
      category,
      url,
      price
    );
    // console.log(onUploaded);

    setImage("");
    setName("");
    setCategory("");
    setUrl("");
    setDescription("");
    setPrice("");
    Swal.fire({ text: "Product Created", confirmButtonColor: "#000000" });
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "proyecto-final");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgqyqqtk4/image/upload",
      //en la url va url-cloudinary/nombrecloud/tipoarchivo/accion
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    // console.log(res);
    setImage(file.secure_url);
    setUrl(file.secure_url);
    // console.log(file.secure_url);
    setLoading(false);
  };

  return (
    <>
      {store.auth ? (
        <div
          className="container mt-5 card bg-dark text-white my-5 mx-auto pt-3"
          style={{ maxWidth: "700px" }}
        >
          <h1 className="fw-bold text-uppercase" style={{ color: "#bdb284" }}>
            Upload your work of art
          </h1>
          <div className="col-5 mx-auto my-5">
            <Form
              onSubmit={handleSubmit}
              style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "1.2rem" }}
            >
              <FormGroup>
                <Label for="exampleName">Name</Label>
                <Input
                  id="exampleName"
                  name="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
                <Label for="exampleCategory">Category</Label>
                <Input
                  id="exampleCategory"
                  name="category"
                  type="text"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  required
                />
                <Label for="examplePrice">Price</Label>
                <Input
                  id="examplePrice"
                  name="price"
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
                <Label for="exampleDescription">Description</Label>
                <Input
                  id="exampleDescription"
                  name="price"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
                <Label for="exampleFile">File</Label>
                <Input
                  id="exampleFile"
                  name="file"
                  type="file"
                  onChange={(e) => {
                    uploadImage(e);
                    setUrl(e.target.value);
                  }}

                  // onChange={(e) => setUrl(e.target.value)}
                  // value={url}
                />
                <div d-flex justify-content-center></div>
                <Button
                  className="btn btn-outline-light btn-lg mx-2 px-5 mt-4"
                  type="submit"
                  style={{ color: "#bdb284" }}
                  color="white"
                >
                  Submit
                </Button>
              </FormGroup>
            </Form>
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

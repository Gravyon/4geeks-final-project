import React, {useContext} from "react";
import { FormGroup, Label, Input, FormText, Form, Button } from "reactstrap";
import { useState } from "react";
import { Context } from "../store/appContext";

export const SubirImagenes = () => {

    const { store, actions } = useContext(Context);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const[name, setName] = useState("");
    const[category, setCategory] = useState("");
    const[description, setDescription] = useState("");
    const[price, setPrice] = useState("");
    let[url, setUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        let onUploaded = await actions.createProduct(name, description, category, url, price);
        console.log(onUploaded)

        setImage("")
        setName("")
        setCategory("")
        setUrl("")
        setDescription("")
        setPrice("")
    }

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
                body: data
                
            }
        )
        const file = await res.json();
        console.log(res);
        setImage(file.secure_url);
        setUrl(file.secure_url);
        console.log(file.secure_url);
        setLoading(false);
    }

    return (
        <div className="container mt-5">
            <h1>Upload your work of art</h1>
            <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="exampleName">
                    Name
                </Label>
                <Input
                    id="exampleName"
                    name="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                 <Label for="exampleCategory">
                    Category
                </Label>
                <Input
                    id="exampleCategory"
                    name="category"
                    type="text"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                />
                  <Label for="examplePrice">
                    Price
                </Label>
                <Input
                    id="examplePrice"
                    name="price"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />
                <Label for="exampleFile">
                    File
                </Label>
                <Input
                    id="exampleFile"
                    name="file"
                    type="file"
                    onChange={uploadImage}
                    
                    // onChange={(e) => setUrl(e.target.value)}
                    // value={url}
                />
                <Button color="info" type="submit">
    Submit
  </Button>
                <FormText>
                    This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
                </FormText>
            </FormGroup>
            </Form>
        </div>
    )
}
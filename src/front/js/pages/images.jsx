import React from "react";
import { FormGroup, Label, Input, FormText } from "reactstrap";
import { useState } from "react";

export const SubirImagenes = () => {

    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

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
        setLoading(false)
    }

    return (
        <div className="container mt-5">
            <h1>Upload your work of art</h1>
            <FormGroup>
                <Label for="exampleName">
                    Name
                </Label>
                <Input
                    id="exampleName"
                    name="name"
                    type="text"
                />
                 <Label for="exampleCategory">
                    Category
                </Label>
                <Input
                    id="exampleCategory"
                    name="category"
                    type="text"
                />
                  <Label for="examplePrice">
                    Price
                </Label>
                <Input
                    id="examplePrice"
                    name="price"
                    type="number"
                />
                <Label for="exampleFile">
                    File
                </Label>
                <Input
                    id="exampleFile"
                    name="file"
                    type="file"
                    onChange={uploadImage}
                />
                <FormText>
                    This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
                </FormText>
            </FormGroup>
        </div>
    )
}
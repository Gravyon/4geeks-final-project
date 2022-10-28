import React from "react";
import { FormGroup, Label, Input, FormText } from "reactstrap";
import { useState, useEffect } from "react";

export const DownloadImages = (props) => {

    const [image, setImage] = useState("");
    useEffect(() => {
            downloadImage();
          }, []);
    

    const downloadImage = async () => {
        // const files = e.target.files;
        try {
            const response = await fetch(
                "https://393275155599582:1pTPbZWVrO9v6peDeDWWiXV-kWU@api.cloudinary.com/v1_1/dgqyqqtk4/resources/image"
            ); //ir a buscar
            const data = await response.json();
            console.log(data);
            // setImage(data);
            
        } catch (err) {
            console.log(err);
        }
        
    }

    return (
        <div className="container mt-5">
          {/* <img src="" alt="" /> */}
          Hola
        </div>
    )
}
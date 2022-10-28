import React from "react";
import { FormGroup, Label, Input, FormText } from "reactstrap";
import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import axios from "axios";

export const DownloadImages = (props) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    downloadImage();
  }, []);

       

    const downloadImage = async () => {
        // const files = e.target.files;
        const results = axios.get("https://api.cloudinary.com/v1_1/"+ process.env.CLOUDINARY_CLOUD_NAME +"/resources/image/list/xmas.json", {
            headers: {
                // Authorization: `Basic ${btoa(process.env.CLOUDINARY_API_KEY + ":" + process.env.CLOUDINARY_API_SECRET)}`
                'Authorization': 'Basic' + base64_encode(process.env.CLOUDINARY_API_KEY + ":" + process.env.CLOUDINARY_API_SECRET)
            }
        })
        // const results = axios.get("https://res.cloudinary.com/" + process.env.CLOUDINARY_CLOUD_NAME +"/image/list/" +process.env.CLOUDINARY_API_KEY + process.env.CLOUDINARY_API_SECRET + ".json")
        .then((response)=>response.json())
        .then((data)=>console.log(data))
        .catch((err)=>console.log(err))
        console.log(results)
        
    }

    return (
        <div className="container mt-5">
          {/* <img src="" alt="" /> */}
          Hola
        </div>
    )
      
  };

  


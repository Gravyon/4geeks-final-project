import React from "react";
import { FormGroup, Label, Input, FormText } from "reactstrap";
import { useState, useEffect } from "react";
// import { Buffer } from "buffer";
<<<<<<< HEAD
=======

>>>>>>> d74f5ad092d19c8b3efbd25538647b0d23396543

export const DownloadImages = (props) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    downloadImage();
  }, []);

<<<<<<< HEAD
  const downloadImage = async () => {
    // const files = e.target.files;
    const results = await fetch(
      "https://api.cloudinary.com/v1_1/" +
        process.env.CLOUDINARY_CLOUD_NAME +
        "/resources/image",
      {
        headers: {
          //   Authorization: `Basic ${Buffer.from(
          //     process.env.CLOUDINARY_API_KEY +
          //       ":" +
          //       process.env.CLOUDINARY_API_SECRET
          //   ).toString("base64")}`,
        },
      }
=======
    const [image, setImage] = useState("");
    useEffect(() => {
            downloadImage();
          }, []);
    

    const downloadImage = async () => {
        // const files = e.target.files;
        const results = await fetch("https://api.cloudinary.com/v1_1/"+ process.env.CLOUDINARY_CLOUD_NAME +"/resources/image", {
            headers: {
                // Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ":" + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
            }
        })
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
>>>>>>> d74f5ad092d19c8b3efbd25538647b0d23396543
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    console.log(results);
  };

  return (
    <div className="container mt-5">
      {/* <img src="" alt="" /> */}
      Hola
    </div>
  );
};
